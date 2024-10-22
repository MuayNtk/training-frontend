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
    fontSize: 8,
    fontFamily: "NotoSansJP",
    display: "flex",
    flexDirection: "column",
    height: "100%", // ให้เต็มความสูง
  },
  header: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  headerCell: {
    border: "1px solid black",
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    border: "1px solid black",
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  yellowHeader: {
    backgroundColor: "#FFFF00",
    padding: 5,
    flex: 1,
    textAlign: "center",
    border: "1px solid black",
  },
  footer: {
    borderTop: "1px solid black",
    paddingTop: 5,
    textAlign: "center",
    fontSize: 10,
    marginTop: "auto", // ทำให้ footer อยู่ด้านล่าง
  },
  footer1: {
    border: "1px solid black",
    flex: 12,
    padding: 5,
    textAlign: "right",
  },
  image: {
    width: 80,
    height: 30,
  },
});

// สร้างโครงสร้าง PDF
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* หัวตาราง */}
      <View style={styles.header}>
        <Text style={[styles.headerCell, { flex: 4 }, { color: "#334fff" }]}>
          <Image style={styles.image} src="/jpspng.png" />
        </Text>
        <Text style={[styles.headerCell, { flex: 4 }, { paddingTop: 15 }]}>
          作業要領書
        </Text>
        <Text style={[styles.headerCell, { flex: 2 }, { paddingTop: 15 }]}>
          製品名
        </Text>
        <Text
          style={[styles.headerCell, { flex: 4 }, { paddingTop: 15 }]}
        ></Text>
        <Text style={[styles.headerCell, { flex: 2 }, { paddingTop: 15 }]}>
          形式
        </Text>
        <Text
          style={[styles.headerCell, { flex: 4 }, { paddingTop: 15 }]}
        ></Text>
        <Text style={[styles.headerCell, { flex: 2 }, { paddingTop: 15 }]}>
          No.
        </Text>
        <Text
          style={[styles.headerCell, { flex: 4 }, { paddingTop: 15 }]}
        ></Text>
      </View>
      <View style={styles.header}>
        <Text style={[styles.headerCell, { flex: 4 }]}>
          {data.companyName || "N/A"}
        </Text>
        <Text style={[styles.headerCell, { flex: 4 }]}>
          {data.title || "N/A"}
        </Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>工程</Text>
        <Text style={[styles.headerCell, { flex: 4 }]}></Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>作業</Text>
        <Text style={[styles.headerCell, { flex: 4 }]}></Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>
          {data.purpose || "N/A"}
        </Text>
        <Text style={[styles.headerCell, { flex: 4 }]}>
          {data.scope || "N/A"}
        </Text>
      </View>

      {/* พื้นที่ว่างเพื่อเติมเต็มหน้าก่อนตาราง */}
      <View style={{ flexGrow: 1 }} />

      {/* ตารางกลาง */}
      <View style={styles.row}>
        <Text style={styles.yellowHeader}>制定・改訂履歴</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>管理記号</Text>
        <Text style={styles.cell}>改訂記号</Text>
        <Text style={styles.cell}>関連ページ</Text>
        <Text style={styles.cell}>作成日</Text>
        <Text style={styles.cell}>作成部署</Text>
        <Text style={[styles.cell, { flex: 3 }]}>改訂内容</Text>
        <Text style={styles.cell}>承認</Text>
        <Text style={styles.cell}>検討</Text>
        <Text style={styles.cell}>作成</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>初版</Text>
        <Text style={styles.cell}>-</Text>
        <Text style={styles.cell}>全ページ</Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={[styles.cell, { flex: 3 }]}>新規発行</Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, { paddingTop: 15 }]}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={[styles.cell, { flex: 3 }]}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
        <Text style={styles.cell}></Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.cell}>注記</Text>
        <Text style={styles.footer1}>1</Text>
      </View>

      {/* Footer ที่อยู่ด้านล่างสุด */}
      <View style={styles.footer}></View>
    </Page>
  </Document>
);

// แสดงผล PDF ในเบราว์เซอร์
function PDFrevisionhistory() {
  const location = useLocation();
  const formData = location.state || {
    companyName: "",
    title: "",
    purpose: "",
    scope: "",
  };

  return (
    <div style={{ height: "100vh" }}>
      <PDFViewer width="100%" height="90%">
        <MyDocument data={formData} />
      </PDFViewer>
    </div>
  );
}

export default PDFrevisionhistory;
