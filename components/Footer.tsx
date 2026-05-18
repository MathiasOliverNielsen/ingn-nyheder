"use client";

import styled from "styled-components";
import { Box, Container, Typography, Link } from "@mui/material";

// Skal jeg være ærlig jeg synes at lave de her sytyled compoennets selv tager lang tid så jeg fik lidt hjælp fra Copilot til at lave strukturen, men jeg har selv tilpasset det, skrevet hvad der er i selectors.
// Dog er de rigtig smarte
const StyledFooter = styled(Box)`
  background-color: #fff;
  color: #000000;
  padding: 40px 0;
  margin-top: 60px;
`;

const FooterSection = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`;

const FooterLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 8px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 4, mb: 3 }}>
          {/* Adresse */}
          <FooterSection>
            <SectionTitle variant="body2">Adresse:</SectionTitle>
            <Typography variant="caption">Inet nyt - Godt nyt ApS</Typography>
            <Typography variant="caption">Tulipanvej 232</Typography>
            <Typography variant="caption">7320</Typography>
            <Typography variant="caption">Valby Øster</Typography>
          </FooterSection>

          {/* Links */}
          {/* todo need to fix */}
          <FooterSection>
            <SectionTitle variant="body2">Links</SectionTitle>
            <FooterLink>vikanweb.dk</FooterLink>
            <FooterLink>overpådenandenside.dk</FooterLink>
            <FooterLink>retsinformation.dk</FooterLink>
            <FooterLink>nogetmednews.dk</FooterLink>
          </FooterSection>

          {/* Politik */}
          <FooterSection>
            <SectionTitle variant="body2">Politik</SectionTitle>
            <FooterLink>Privatlivspolitik</FooterLink>
            <FooterLink>Cookiepolitik</FooterLink>
            <FooterLink>Købsinformation</FooterLink>
            <FooterLink>Delingspolitik</FooterLink>
          </FooterSection>

          {/* Kontakt */}
          <FooterSection>
            <SectionTitle variant="body2">Kontakt</SectionTitle>
            <FooterLink href="mailto:ingn@nyhed.dk">ingn@nyhed.dk</FooterLink>
            <Typography variant="caption">Telefon: 23232323</Typography>
            <Typography variant="caption">Fax: 123123-333</Typography>
          </FooterSection>
        </Box>
      </Container>
    </StyledFooter>
  );
}
