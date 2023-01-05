
import { Attachment, EmojiEmotions, MoreVert, Send } from '@mui/icons-material'
import { Box, Grid, Paper, TextField, Tooltip } from '@mui/material'
import axios from './axios'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { errorToastOptions } from '../../utils/react-toastify'
import Header from './Components/Header'
import moment from 'moment'
import { userContext } from '../../utils/store'

interface Chat {
  name: string,
  email: string,
  date: string,
  message: string,
}

interface Student {
  name: string,
  email: string
}

const ClassRoom = () => {
  const { department, subject, semester } = useParams()

  const [input, setInput] = useState("");

  const [chats, setChats] = useState<Chat[]>([])

  const [teacher, setTeacher] = useState();

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => console.log(input), [input])

  let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  useEffect(() => {
    axios.get(`/teacher/chat/${department}/${subject}/${semester}`).then(res => {
      console.log(res.data)
      setChats(res.data)
    })

    axios.get(`/teacher/people/all/${department}/${subject}/${semester}`).then(res => {
      console.log(res.data)
      // setChats(res.data)
      setTeacher(res.data.teachers)
      setStudents(res.data.students)
    })

  }, [])

  const handleSubmit = () => {
    console.log("handlesubmit")
    if (input.trim() === "") {
      toast("Message is empty", errorToastOptions)
      return
    }
    axios.patch("/teacher/chat/add", { message: input, subject: subject, department: department, semester : semester }).then(() => setInput(""))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const [showPeople, setShowPeople] = useState(false);

  return (
    <Fragment>
      <Header active='community' setShowPeople={setShowPeople} />
      <div className='h-[160vh] sm:h-[calc(100vh-6rem)] box-border'>
        <div className='w-full h-1/6 sm:h-1/4 px-5 py-2'>
          <div className='w-full h-full rounded-lg bg-slate-500 flex'>
            <span className='m-auto text-white text-2xl '>Banner</span>
          </div>
        </div>
        <div className='w-full h-5/6 sm:h-3/4 grid grid-cols-1 sm:grid-cols-4 p-2'>
          <div className='w-full p-3'>
            <div className='w-11/12 h-full m-auto border-dashed border-2 border-sky-500 rounded-lg lg:h-5/6'>
              <h2 className='mt-3 text-center text-gray-600 font-semibold text-2xl'>Events</h2>
            </div>
          </div>
          <div className='col-span-3 w-full h-[80vh] sm:h-[70vh]'>
            <div className=" bg-slate-100 w-[99%] h-[calc(100%-3.5rem)] overflow-y-scroll">
              <div className={`${chats.length < 1 && "h-full justify-center"} w-100 flex items-center my-3 flex-col`}>
                <img className={`${chats.length > 0 ? "w-20 h-20" : "w-48 h-w-48"} rounded-full shadow-lg`} src="https://cdn.pixabay.com/photo/2019/12/14/19/05/thinking-4695538__340.jpg" alt="" />
                <h3 className={`${chats.length > 0 ? "text-lg mt-2" : "text-2xl mt-4"}  text-sky-600`}>Don't hesitate ask you'r doubts</h3>
              </div>
              {
                chats.map(chat => {
                  return <ChatBubble chat={chat} />
                })
              }
            </div>
            <div className="w-[99%] bg-slate-50 h-14 flex justify-around px-5 items-center">
              <Attachment className='-rotate-45' />
              <EmojiEmotions />
              <input onKeyDown={handleKeyDown} type="tex relativet" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Type something here..."
                className="w-[90%] h-10 pl-1 text-sm rounded-md m-auto pb-0 text-gray-900 appearance-none peer focus:outline-none bg-slate-300"
              ></input>
              <Send />
            </div>
          </div>
        </div>
        <div className={`w-4/5 h-full sm:h-[92vh] absolute top-14  sm:w-1/4 right-0 bg-slate-500 bg-opacity-70 ${!showPeople && "hidden"}`}>
          <div className='w-full h-14 flex flex-col'>
            <h2 className=' text-xl font-semibold text-white ml-3 mt-3'>People</h2>
            <input type="text" className='bg-transparent border-2 border-white text-white w-11/12 mx-auto mt-3 p-3 rounded-lg appearance-none focus:outline-none' placeholder='Search for people' />
            <div className='p-4'>
              {
                teacher && <div className='grid grid-cols-6 mt-3'>
                  <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                  <div className=' my-auto mr-auto col-span-4 w-full'>
                    <h3 className=' text-white truncate w-full' >{teacher}</h3>
                    <span className='text-white text-sm'>Teacher</span>
                  </div>
                  <MoreVert className='text-white m-auto' />
                </div>
              }
              {
                students.map(student => {
                  return (
                    <div className='grid grid-cols-6 mt-3'>
                      <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                      <h3 className='col-span-4  my-auto mr-auto text-white truncate w-full' >{student.name}</h3>
                      <MoreVert className='text-white m-auto' />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  )
}

const Message = styled.div`
  padding : 0rem 2rem 0rem 2rem;
`

const Circle = styled.div`
  width : 2.5rem;
  height : 2.5rem;
  background-color : #EBEBEB;
  border-radius : 100px;
  margin : auto
`

const ChatBar = styled.div`
  width : 100%;
  // height : 3.3rem;
  background-color : #fff;
  display : flex;
`

export default ClassRoom

const ChatBubble = ({ chat }: { chat: Chat }) => {

  const { user } = useContext(userContext)


  if (chat.email === user?.email) {
    return (
      <div className="flex mb-6 flex-row-reverse pr-3">
        <div className=' relative'>
          {/* <span className='text-xs w-12 truncate overflow-hidden inline-block absolute -top-4 right-12'>{chat.name}</span> */}
          <div className='flex '>
            <div className='bg-sky-200 rounded-t-2xl rounded-bl-2xl px-3 py-2 mr-2  '>
              {chat.message}
            </div>
            <Tooltip title={chat.name} placement="top" >
              <div className='w-9 h-9 mt-auto rounded-full bg-slate-700'></div>
            </Tooltip>
          </div>
          <span className='text-xs truncate overflow-hidden inline-block absolute -bottom-4 right-12'>{handleDate(chat.date)}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex mb-6 pl-3">
        <div className=' relative'>
          {/* <span className='text-xs w-12 truncate overflow-hidden inline-block absolute -top-4 right-12'>{chat.name}</span> */}
          <div className='flex flex-row-reverse'>
            <div className='bg-slate-200 rounded-t-2xl rounded-br-2xl px-3 py-2 ml-2  '>
              {chat.message}
            </div>
            <Tooltip title={chat.name} placement="top" >
              <div className='w-9 h-9 mt-auto rounded-full bg-slate-700'></div>
            </Tooltip>
          </div>
          <span className='text-xs truncate overflow-hidden inline-block absolute -bottom-4 left-12'>{handleDate(chat.date)}</span>
        </div>
      </div>
    )
  }
}


const MessageWithLinks = ({ message }: { message: string }) => {
  const handleLinks = (message: string): string => {
    const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?|(www\.[\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/;
    return message.replace(regex, (match, p1, p2, p3, p4, p5) => {
      if (p1) {
        return `<a href="${p1}://${p2}${p3}">${p1}://${p2}${p3}</a>`;
      } else {
        return `<a href="http://${p4}${p5}">http://${p4}${p5}</a>`;
      }
    });
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: handleLinks(message) }} />
  );
}

const handleDate = (dateString: string) => {
  const date = new Date(dateString)
  return moment(date).fromNow();
}