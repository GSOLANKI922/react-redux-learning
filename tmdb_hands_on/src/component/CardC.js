import { Button, Card, Popconfirm, Space, Tooltip } from "antd";
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
  allData,
  deleteHandler,
  editMovieHandler,
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
        <Link to={`/movieDetails/${id}`}>
          <img
            style={{ maxWidth: "240px" }}
            alt="random Img"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </Link>
      }
    >
      <Link to={`/movieDetails/${id}`} style={{ lineHeight: "30px" }}>
        <Meta title={`Title : ${title}`} />
        <Meta description={`Budget : ${budget}`} />
        <Meta description={`Revenue : ${revenue}`} />
        <Meta
          description={`ReleaseDate : ${new Date(releaseDate)
            .toISOString()
            .slice(0, 10)}`}
        />
      </Link>
      <Space wrap style={{ marginTop: "5px" }}>
        <Tooltip title="Edit">
          <Button onClick={() => editMovieHandler(allData)}>
            <EditOutlined />
          </Button>
        </Tooltip>
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteHandler(id)}>
          <Tooltip title="Delete">
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
      </Space>
    </Card>
  );
};
export default CardC;
