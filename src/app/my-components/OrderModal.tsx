"use client";

import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function OrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  // Функция форматирования номера в стиль +7 (XXX) XXX-XX-XX
  const formatPhoneNumber = (input: string) => {
    let numbers = input.replace(/\D/g, ""); // Удаляем всё, кроме цифр
    if (numbers.startsWith("8")) numbers = "7" + numbers.slice(1); // Заменяем 8 на 7
    if (numbers.length > 11) numbers = numbers.slice(0, 11); // Ограничиваем 11 символами

    let formatted = "+7";
    if (numbers.length > 1) formatted += ` (${numbers.slice(1, 4)}`;
    if (numbers.length > 4) formatted += `) ${numbers.slice(4, 7)}`;
    if (numbers.length > 7) formatted += `-${numbers.slice(7, 9)}`;
    if (numbers.length > 9) formatted += `-${numbers.slice(9, 11)}`;

    setPhone(formatted);
    setPhoneError(numbers.length < 11); // Ошибка, если введено < 11 цифр
  };

  const handleSubmit = async () => {
    const now = Date.now();

    // Проверяем ограничение по времени (30 секунд между заявками)
    if (lastSubmitTime && now - lastSubmitTime < 30000) {
      alert("Вы уже отправили заявку. Подождите 30 секунд.");
      return;
    }

    if (!name || phoneError) {
      alert("Введите корректные данные.");
      return;
    }

    setLoading(true);
    setLastSubmitTime(now); // Запоминаем время последней отправки

    const templateParams = { name, phone, message };

    emailjs
      .send("service_mfy59yc", "template_rjr5ydr", templateParams, "SVVG3rioLQLabouUw")
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
        alert("Ошибка при отправке заявки.");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, bgcolor: "white", p: 3, mx: "auto", mt: "20vh", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Оставьте заявку</Typography>
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Телефон"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => formatPhoneNumber(e.target.value)}
          error={phoneError}
          helperText={phoneError ? "Введите полный номер" : ""}
        />
        <TextField
          label="Доп. информация"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </Button>
        {success && <Typography color="green" sx={{ mt: 2, textAlign: "center" }}>Заявка отправлена!</Typography>}
      </Box>
    </Modal>
  );
}
