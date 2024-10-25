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
  width: "100%"
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
  margin: "0 8px"
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
        <Grid container spacing={4}>
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                {section.title}
              </Typography>
              {section.items.map((item, idx) => (
                <FooterLink
                  variant="body2"
                  key={idx}
                  component="a"
                  role="link"
                  tabIndex={0}
                  aria-label={item}
                >
                  {item}
                </FooterLink>
              ))}
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            marginTop: "32px",
            paddingTop: "32px",
            textAlign: "center"
          }}
        >
          <Box sx={{ marginBottom: "24px" }}>
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={index}
                aria-label={social.label}
                role="link"
                tabIndex={0}
              >
                {social.icon}
              </SocialIcon>
            ))}
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;


import github from '../img/github.png';
import { useEffect } from 'react';

const Footer = () => {

    useEffect(()=>{
        document.getElementById('git').style.backgroundImage = `url(${github})`;
    })

    return(
        <div>

        </div>
    )
}