import React, { useState, useEffect } from 'react';
import ServicePath from '../config/apiUrl';
import axios from 'axios';
import { List, Card } from 'antd';
import { Row, Col } from 'antd';
import Link from 'next/link';

const { Meta } = Card;
function Novels() {
  const [novelList, setNovelList] = useState([]);

  useEffect(() => {
    getNovelList();
  }, []);

  // 首页获取小说列表
  const getNovelList = () => {
    axios({
      method: 'get',
      url: ServicePath.GetNovelList,
      withCredentials: true,
    }).then(res => {
      // console.log(res);
      console.log(res.data.res[0].img);
      setNovelList(res.data.res);
    });
  };
  // 首页的小说展示
  return (
    <>
      <Row>
        <Col span={18} offset={3}>
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={novelList}
            renderItem={item => (
              <List.Item>
                <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt='image' src={item.img} />}
                  >
                    <Meta
                      title={item.name}
                      description={
                        item.species +
                        '   ' +
                        item.status +
                        '    共' +
                        item.chapter +
                        '章'
                      }
                    />
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default Novels;
