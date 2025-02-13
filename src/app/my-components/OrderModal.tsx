"use client";

import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function OrderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("Введите имя и телефон");
      return;
    }

    setLoading(true);

    const templateParams = {
      name,
      phone,
      message,
    };

    emailjs
      .send(
        "service_mfy59yc",   
        "template_rjr5ydr",  
        templateParams,
        "SVVG3rioLQLabouUw"    
      )
      .then(() => {
        setSuccess(true);
        setName("");
        setPhone("");
        setMessage("");
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
        <TextField label="Имя" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Телефон" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField label="Доп. информация" fullWidth margin="normal" multiline rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </Button>
        {success && <Typography color="green" sx={{ mt: 2, textAlign: "center" }}>Заявка отправлена!</Typography>}
      </Box>
    </Modal>
  );
}
