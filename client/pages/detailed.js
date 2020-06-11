import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import axios from 'axios';
import ServicePath from '../config/apiUrl';
const Detail = (peops) => {
  // const [novel, setNovel] = useState();
  // useEffect(()=>{
  //   console.log('hello')
  // },[])
  return (
    <div>
      <Head>
        <title>在线小说阅读</title>
      </Head>
      <Header />
      <div>Hello</div>
    </div>
  );
};
// Detail.getInitialProps = async ctx => {
//   const id = ctx.query.id;
//   console.log(ServicePath.GetNovelDetails);
//   let promise = new Promise(resolve => {
//     axios(ServicePath.GetNovelDetails + id).then(res => {
//       console.log(res);
//       resolve(res.res);
//     });
//   });
//   return await promise;
// };
Detail.getInitialProps = async context => {
  console.log(context.query.id);
  let id = context.query.id;
  console.log(id)
  const promise = new Promise(resolve => {
    axios(ServicePath.GetNovelDetails + id).then(res => {
      console.log(res.data,'---------');
      resolve(res.data.res);
    });
  });
  return await promise;
};
export default Detail;
