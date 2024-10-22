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

// Register the Noto Sans JP font from Google Fonts CDN
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
    fontFamily: "NotoSansJP",
    position: "relative",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "NotoSansJP",
  },
  image: {
    paddingTop: 5,
    width: 103,
    height: 60,
  },
  image2: {
    paddingTop: 10,
    width: 350,
    height: 370,
    marginVertical: 15,
    alignSelf: "center",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    border: "1 solid black",
    padding: 5,
    flex: 1,
    textAlign: "center",
  },
});

const MyDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Start Header */}
        <View
          style={[styles.table, { fontSize: 14 }, { fontWeight: "normal" }]}
        >
          <View style={styles.tableRow}>
            <Image style={styles.image} src={data.logo || "/jpspng.png"} />
            <Text
              style={[
                styles.tableCell,
                { flex: 5 },
                { color: "white" },
                { fontSize: 16 },
                { backgroundColor: "#3333FF" },
                { paddingTop: 17 },
              ]}
            >
              O P L ワンポイントレッスン
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{data.companyName || "N/A"}</Text>
            <Text style={[styles.tableCell, { flex: 5 }]}>
              {data.title || "N/A"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>目的</Text>
            <Text style={[styles.tableCell, { flex: 5 }]}>
              {data.purpose || "N/A"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>範囲</Text>
            <Text style={[styles.tableCell, { flex: 5 }]}>
              {data.scope || "N/A"}
            </Text>
          </View>
        </View>
        {/* End Header */}

        <View style={{ marginTop: 20 }}>
          {data.image ? (
            <Image style={styles.image2} src={data.image} />
          ) : (
            <Text style={{ textAlign: "center", fontSize: 14, color: "red" }}>
              No File Uploaded
            </Text>
          )}
        </View>

        {/* Start Footer */}
        <View style={[styles.table, { fontSize: 12, marginTop: "auto" }]}>
          <View
            style={[
              styles.tableRow,
              {
                backgroundColor: "#3333FF",
                color: "white",
                textAlign: "center",
              },
            ]}
          >
            <Text style={[styles.tableCell]}>管理記号</Text>
            <Text style={[styles.tableCell]}>改訂記号</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>改訂内容</Text>
            <Text style={[styles.tableCell]}>作成部署</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>作成日</Text>
            <Text style={[styles.tableCell]}>承認</Text>
            <Text style={[styles.tableCell]}>検討</Text>
            <Text style={[styles.tableCell]}>作成</Text>
          </View>
          {/* Footer content */}
          <View style={[styles.tableRow, { textAlign: "center" }]}>
            <Text style={[styles.tableCell, { paddingTop: 20 }]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell, { flex: 3 }]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>　　/　　/　　</Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
          </View>
          {/* Additional footer rows */}
          <View
            style={[
              styles.tableRow,
              { textAlign: "center", backgroundColor: "#00CC66" },
            ]}
          >
            <Text style={[styles.tableCell]}>教育訓練記録</Text>
          </View>
          <View style={[styles.tableRow, { textAlign: "center" }]}>
            <Text style={[styles.tableCell, { flex: 1.1 }]}>所属部署</Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
          </View>
          <View style={[styles.tableRow, { textAlign: "center" }]}>
            <Text style={[styles.tableCell, { flex: 1.1 }]}>実施日</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
            <Text style={[styles.tableCell]}>　/　/　</Text>
          </View>
          <View style={[styles.tableRow, { textAlign: "center" }]}>
            <Text style={[styles.tableCell, { flex: 1.1 }]}>氏名</Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
            <Text style={[styles.tableCell]}></Text>
          </View>
        </View>
        {/* End Footer */}
      </Page>
    </Document>
  );
};

const PDFLession = () => {
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
};

export default PDFLession;
