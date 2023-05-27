import React, { useEffect, useState } from 'react';
import img1 from "./../../Assets/avatar.png"
import axios from 'axios';
const Main = () => {
  const [usersData, setUsersData] = useState('');
  const [usersDetailData, setUsersDetail] = useState('');

  const setActiveUser = (id)=>{
    const activeEle = document.querySelector('.activeUser');
    if(activeEle){
      activeEle.classList.remove('activeUser');
    }
    const clickedEle = document.querySelector('#userBtn' + id);
    console.log(clickedEle,id);
    if(clickedEle){

      clickedEle.classList.add('activeUser');
    }
  }

  useEffect(() => {
    axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {

          setUsersData(res.data);
          setUsersDetail(res.data[0])
          setActiveUser('0')

        }, 500)
      }).catch((err) => {
        console.log(err.message);
      });

  }, []);

  useEffect(() => {
    if (usersData) {

      const image1 = document.querySelector("#detailImg");
      var isLoaded = image1 && image1.complete && image1.naturalHeight !== 0;
      if (!isLoaded) {
        image1.src = img1
      }

    }
  }, [usersDetailData]);
  
  

  if (usersData === '') {
    return <div className='d-flex vh-100 justify-content-center align-items-center fw-bold fs-4'>
      <div class="spinner-border mx-2" role="status"></div>
      Loading...
    </div>
  }
  return (
    <div className='d-flex flex-wrap' style={{ background: "#b4e2f5" }}>
      <div className='col-12 col-lg-7 d-flex text-center pt-5'>
        <div className='w-100 ps-lg-5 ms-lg-5' >

          <div className='text-center fw-bold text-center fs-4 mb-2 mt-5' >
            Users List
          </div>
          <div id='overflow-hidden' className='bg-white d-flex justify-content-center border rounded-5' style={{ maxHeight: '70vh', overflow: 'auto' }}>
            <div className='w-100 p-4'>
              {usersData.map((each, index) => {
                return (

                  <div id={'userBtn' + index} onClick={()=>{
                    setActiveUser(index);
                    setUsersDetail(each)
                    }} role='button' className='selectBtn px-3 py-2 rounded-4 mb-2 mt-2'>
                    <div className='d-flex align-items-center'>
                      <img id={"img" + index} src={(index < 10) ? img1 : each.avatar} class="rounded-5" width='40px' />

                    </div>
                    <div className='fw-semibold p-2 px-3 fs-3'>
                      {each.profile.firstName + ' ' + each.profile.lastName}
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

        </div>
      </div>
      <div className='col-12 col-lg-5 d-flex justify-content-center align-items-center vh-100 sticky-top align-self-start'>
        <div className='d-flex justify-content-center flex-column'>
          <div className='card-header rounded-0 rounded-bottom fw-bold text-center fs-4 mb-2' >
            User Details
          </div>
          <div class="card text-center rounded-4" style={{ width: "24rem" }}>
            <div className='px-3 pt-4 pb-2 '>
              <img id='detailImg' src={usersDetailData.avatar} class="" width='130px' style={{ borderRadius: "72px" }} />
            </div>
            <div class="card-body px-4 pb-4">
              <h5 class="card-title">@{usersDetailData.profile.username}</h5>
              <div className='border text-start rounded-3 fw-semibold my-3 p-2' style={{ background: "#e2e1e1" }}>
                {usersDetailData.Bio}
              </div>
              <div className='text-start'>
                Full Name
              </div>
              <div className='border text-start rounded-3 fw-semibold p-2 fs-5' style={{ background: "#e2e1e1" }}>
                {usersDetailData.profile.firstName + ' ' + usersDetailData.profile.lastName}

              </div>
              <div className='text-start'>
                Job Title
              </div>
              <div className='border text-start rounded-3 fw-semibold p-2 fs-5' style={{ background: "#e2e1e1" }}>
                {usersDetailData.jobTitle}
              </div>
              <div className='text-start'>
                Email
              </div>
              <div className='border text-start rounded-3 fw-semibold p-2 fs-5' style={{ background: "#e2e1e1" }}>
                {usersDetailData.profile.email}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Main;
