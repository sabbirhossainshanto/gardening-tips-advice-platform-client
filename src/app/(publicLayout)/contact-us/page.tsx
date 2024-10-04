"use client";

import { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  Spacer,
  CardBody,
} from "@nextui-org/react";
import { toast } from "sonner";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.success(
      "Thank you! We received your message... We will contact with you soon!"
    );
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Contact Us</h1>
      <Spacer y={2} />
      <Card className="p-1">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Input
              label="Name"
              placeholder="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Spacer y={1} />
            <Input
              label="Email"
              type="email"
              placeholder="Your Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Spacer y={1} />
            <Input
              label="Subject"
              placeholder="Subject"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <Spacer y={1} />
            <Textarea
              label="Message"
              placeholder="Your Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Spacer y={1} />
            <Button type="submit" color="primary" size="lg" fullWidth>
              Send Message
            </Button>
          </form>
        </CardBody>
      </Card>
      <Spacer y={2} />
      <p className="text-center">
        For any inquiries, please reach out to us at:
      </p>
      <p className="text-center">support@gardeningplatform.com</p>
    </div>
  );
};

export default ContactUs;
