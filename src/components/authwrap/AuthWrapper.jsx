import React from "react";
import { Box, styled, Typography, Card, Grid } from "@mui/material";

const UserBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100vh",
  maxWidth: { xl: 1650 },
  mx: { xl: "auto" },
  width: { xl: "100vh" },
  backgroundColor: "#F6F4EB",
});

const AuthWrapper = ({ children }) => {
  return (
    <UserBox>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { xs: 5, md: 7.5, xl: 12.5 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: 900,
              minHeight: { xs: 320, sm: 450 },
              width: "100%",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", sm: "row", lg: "row" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%", lg: "50%" },
                position: "relative",
                padding: { xs: 0, lg: 4 },
                display: { xs: "flex", sm: "flex" },
                alignItems: { sm: "center" },
                justifyContent: { sm: "center" },
                flexDirection: { sm: "column" },
                backgroundColor: "#19A7CE",
                color: (theme) => theme.palette.common.white,
                fontSize: 14,
              }}
            >
              <Box
                sx={{
                  maxWidth: 320,
                  margin: "auto", // Center the Box horizontally
                  textAlign: "center", // Center text inside the Box
                  padding: { xs: 2,sm:0,lg:0}
                }}
              >
                <Grid
                  container
                  spacing={2} // Adjust spacing as needed
                  justifyContent="center" // Center horizontally
                  alignItems="center" // Center vertically
                >
                  <Grid item>
                    <Typography
                      component="h2"
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: 16, sm: 24, lg: 35 },
                        mb: 4,
                      }}
                    >
                      教育⽀援システム
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "50%", lg: "50%" },
                padding: { xs: 2, lg: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ mb: { xs: 6, xl: 8 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                      {children}
                  </Box>
                </Box>
              
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </UserBox>
  );
};

export default AuthWrapper;
