import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Grid, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';

const features = [
  { title: 'Clean Code', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <CodeIcon style={{ fontSize: 40 }} /> },
  { title: 'Object Oriented', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <SettingsIcon style={{ fontSize: 40 }} /> },
  { title: '24h Service', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <SupportIcon style={{ fontSize: 40 }} /> },
  { title: 'Value for Money', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <AttachMoneyIcon style={{ fontSize: 40 }} /> },
  { title: 'Faster Response', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <SpeedIcon style={{ fontSize: 40 }} /> },
  { title: 'Cloud Support', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit quam nihil.', icon: <CloudIcon style={{ fontSize: 40 }} /> },
];

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-16 bg-[#EAF5F5]">
      <Container>
        <h2 className="text-4xl font-bold text-center mb-12">
          Something You Need To Know
        </h2>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-up">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-[#00a7a3] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <Typography variant="body2" color="textSecondary">{feature.description}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Features;
