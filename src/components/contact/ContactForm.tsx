import React, { useState } from 'react';
import styles from "../../styles/components/ContactForm.module.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Din melding er sendt!');  
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.ContactContainer}>
        <p className={styles.details}>Ta gjerne kontakt med oss på skjemaet under!</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Mitt navn"
              required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Bruker@epost.no"
              required
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Skriv beskjeden her!"
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
