import Head from 'next/head';
import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import { useState } from 'react';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Total = (props: any) => {
  let tax = props.total * 0.1;
  let totalPrice = tax + props.total;
  return (
    <div className="row">
      <div className="col-xs-offset-2 col-xs-8">
        <div className="form-group text-center">
          <span id="total-price">消費税：{tax}円</span><br />
          <span id="total-price">ご注文金額合計：{totalPrice}円 (税込)</span>
        </div>
      </div>
    </div>
  )
}

function CartPage() {
  let total = 0;
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    'http://localhost:8000/cartItems',
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>ラクスヌードル</title>
      </Head>

      <h1 className="page-title">ショッピングカート</h1>

      <div className="row">
        <table className="striped">
          <thead>
            <tr>
              <th className="cart-table-th">商品名</th>
              <th>価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>

          <tbody>
            {data.map((cartitem: any) => {
              return (
                <tr>
                  <td className="cart-item-name">
                    <div className="cart-item-icon">
                      <Image
                        src={cartitem.img}
                        width={200}
                        height={143}
                      />
                    </div>
                    <span>{cartitem.name}</span>
                  </td>

                  <td>
                    <span className="price">
                      {/* &nbsp;{cartitem.size} */}
                    </span>
                    {cartitem.price}円 {cartitem.quantity}個
                  </td>


                  <td>    
                  {cartitem.options.map((option:any,index:any)=> {
                    return(
                    <li key={index}>{option}</li>
                    )
                    })}
                  </td> 


                  <td>
                  <span className="text-center">
                    {cartitem.subtotal}円
                  </span>
                  </td>

                  <td>
                    <button
                      onClick={(index:any) => {
                        let number = index + 1
                        fetch(
                          `http://localhost:8000/cartItems/${cartitem.id}`,
                          { method: 'DELETE' }
                        );
                        mutate('http://localhost:8000/cartItems');
                      }}
                    >
                      [削除]
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row cart-total-price">
        <p  style={{display:"none"}} >
      {data.map((data: any) => 
      total += data.subtotal)}
      </p>
      </div>
      <Total total={total} />

      <div className="row order-confirm-btn">
        <Link href={`http://localhost:3000/items/order_confirm`}>
          <button className="btn" type="button">
            <span>注文に進む</span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default CartPage;


// const [noneItem, setNoneItem] = useState('none'); 
    // if(data.length == 0){
      // setNoneItem('blook');
      // }else{
      //   setNoneItem('none');
      // }

  // 消去ボタン        
  // const handleClick = (e: any,index:any) => {
  //   let number = index + 1
  //   fetch(
  //     `http://localhost:8000/cartItems/${cartitem.id}`,
  //     { method: 'DELETE' }
  //   );
  //   mutate('http://localhost:8000/cartItems');

// 表示非表示の設定 （カート中にないです）
  //   {if( data.length < 3){
  //     let noneItem = document.getElementById('noneItem') as HTMLInputElement
  //     noneItem.style.display = "block"
  //   }else{
  //     let noneItem = document.getElementById('noneItem') as HTMLInputElement
  //     noneItem.style.display = "none"
  //   }
  // }

  // 表示非表示の設定（注文ボタン、合計金額）
//   {if( data.length >=1 ){
//     let hyouji = document.getElementById('hyouji') as HTMLInputElement
//     hyouji.style.display = "block"
//   }else{
//     let hyouji = document.getElementById('hyouji') as HTMLInputElement
//     hyouji.style.display = "none"
//   }
// }
      // console.log(data,"data",data.length)
      // <p id="noneItem" style={{ display: "none" }} >カートに商品がありません</p> 
