import { Card } from "antd";
const { Meta } = Card;

const Card_C = ({ budget, releaseDate, revenue, status, title, id }) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    className="card_container"
    cover={
      <img
        alt="rendom Img"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
  >
    <Meta title={`Title : ${title}`} description="www.instagram.com" />
    <Meta description={`Budget : ${budget}`} />
    <Meta description={`Revenue : ${revenue}`} />
    <Meta
      description={`ReleaseDate : ${new Date(releaseDate)
        .toISOString()
        .slice(0, 10)}`}
    />
  </Card>
);
export default Card_C;
