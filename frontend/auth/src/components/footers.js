import React from "react";
import { Box, Container, Grid, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a237e",
  color: "#ffffff",
  padding: "48px 0 24px 0",
  position: "relative",
  bottom: 0,
  width: "100%",
  display: 'flex',
  justifyContent: 'center'
}));



const FooterLink = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#90caf9"
  },
  marginBottom: "8px"
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "#ffffff",
  transition: "transform 0.3s ease, color 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    color: "#90caf9"
  },
  margin: "0 8px",
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerLinks = [
    { title: "Company", items: ["About Us", "Our Team", "Careers", "Contact Us"] },
    { title: "Services", items: ["Web Design", "Development", "Consulting", "Marketing"] },
    { title: "Resources", items: ["Blog", "Newsletter", "Events", "Help Center"] }
  ];

  const socialLinks = [
    { icon: <FaFacebook size={24} />, label: "Facebook" },
    { icon: <FaTwitter size={24} />, label: "Twitter" },
    { icon: <FaInstagram size={24} />, label: "Instagram" },
    { icon: <FaLinkedin size={24} />, label: "LinkedIn" }
  ];

  return (
<FooterContainer component="footer" role="contentinfo">
  <Container maxWidth="lg">
    <Box
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '24px',
      }}
    >
      {socialLinks.map((social, index) => (
        <SocialIcon
          key={index}
          aria-label={social.label}
          role="link"
          tabIndex={0}
          sx={{ margin: '0 8px' }} // Optional: Add spacing between icons
        >
          {social.icon}
        </SocialIcon>
      ))}
    </Box>
    <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
      © {new Date().getFullYear()} Product of Education.
    </Typography>
  </Container>
</FooterContainer>

  );
};

export default Footer;