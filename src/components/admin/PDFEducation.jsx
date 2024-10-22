import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

// สร้างสไตล์ต่าง ๆ ที่จำเป็น
Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/fonts/NotoSansJP-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/NotoSansJP-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 12,
    fontFamily: "NotoSansJP",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
  },
  contentText: {
    textAlign: "center",
  },
  image: {
    width: "100%", // หรือปรับให้เหมาะสมตามความต้องการ
    height: "auto",
    margin: "20px 0", // ระยะห่างระหว่างภาพกับข้อความ
  },
});

// สร้างโครงสร้าง PDF
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* ข้อความแรกอยู่บนสุด */}
      <View style={styles.header}>
        <Text style={styles.contentText}>
          <strong>タイトル:</strong> {data.title || "N/A"}
        </Text>
      </View>

      {/* แสดงภาพ */}
      {data.file && (
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Image src={data.file} style={styles.image} />
        </View>
      )}

      {/* ข้อความที่สองอยู่ล่างสุด */}
      <View style={styles.footer}>
        <Text style={styles.contentText}>
          <strong>説明:</strong> {data.description || "N/A"}
        </Text>
      </View>
    </Page>
  </Document>
);

function PDFEducation() {
  const location = useLocation();
  const formData = location.state || {
    title: "Default Title",
    description: "Default Description",
    file: null, // ตรวจสอบให้แน่ใจว่าไฟล์เป็น null หากไม่มี
  };

  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="90%">
        <MyDocument data={formData} />
      </PDFViewer>
    </div>
  );
}

export default PDFEducation;
