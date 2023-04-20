import { Button, Card, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const CardC = ({
  budget,
  releaseDate,
  revenue,
  loading,
  title,
  id,
  deleteHandler,
}) => {
  return (
    <Card
      loading={loading}
      hoverable
      style={{
        width: 240,
      }}
      className="card_container"
      cover={
        <Link to={`/moviedetails/${id}`}>
          <img
            style={{ maxWidth: "240px" }}
            alt="rendom Img"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </Link>
      }
    >
      <Link to={`/moviedetails/${id}`}>
        <Meta title={`Title : ${title}`} description="www.instagram.com" />
        <Meta description={`Budget : ${budget}`} />
        <Meta description={`Revenue : ${revenue}`} />
        <Meta
          description={`ReleaseDate : ${new Date(releaseDate)
            .toISOString()
            .slice(0, 10)}`}
        />
      </Link>
      <Space wrap style={{ marginTop: "5px" }}>
        <Button>
          <EditOutlined />
        </Button>
        <Button onClick={() => deleteHandler(id)} danger>
          <DeleteOutlined />
        </Button>
      </Space>
    </Card>
  );
};
export default CardC;
