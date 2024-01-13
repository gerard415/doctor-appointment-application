import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserProps, imageProps } from '../types';
import { UserContext } from '../UserContext';
import ImageUploader from '../Components/ImageUploader';
import { Navigate } from 'react-router-dom';

const PatientSettingsPage = () => {
  const {setUser, user, ready}: UserProps = useContext(UserContext)
  const fullName = user?.name?.split(' ')
  

  const [firstname, setFirstName] = useState<string>(!fullName ? '' : fullName[0])
  const [lastname, setLastName] = useState<string>(!fullName ? '' : fullName[1])
  const [email, setEmail] = useState<string | undefined>(user?.email)
  const [password, setPassword] = useState<string | undefined>()
  const [bloodtype, setBloodType] = useState<string | undefined>(user?.bloodtype)
  const [phone, setPhone] = useState<number | undefined>(user?.phone)
  const [photo, setPhoto] = useState<imageProps[]>([{fileName: '', filePath: ''}])
  const [redirect, setRedirect] = useState<boolean>(false)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(firstname === '' || lastname === '' || (password && password.length < 8)){
      console.log('profile could not be updated')
    }

    try {
      const {data} = await axios.patch('/patient/profile', {
        name:firstname+ ' ' +lastname, password, bloodtype, phone, photo:photo[0].filePath
      })
      setUser(data)
      setRedirect(true)
    } catch (error) {
      console.log(error)
    }
  }

  if(redirect){
    return <Navigate to={'/profile'}/>
  }

  return (
    <div className='py-3 space-y-2'>
        <p className='font-bold text-[20px]'>Profile Settings</p>
        <form onSubmit={handleUpdate} className='space-y-4'>
          <div className='space-y-3'> 
            <input type="text" name="first name" value={firstname} onChange={(e) => setFirstName(e.target.value)} id="" placeholder={'first name'} className='border-b w-full h-[30px] text-gray-400 text-[15px] outline-none '/>
            <input type="text" name="last name" value={lastname} onChange={(e) => setLastName(e.target.value)} id="" placeholder={'last name'} className='border-b w-full h-[30px] text-gray-400 text-[15px] outline-none '/>
            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='border-b w-full h-[30px] text-gray-400 text-[15px] outline-none '/>
            <input type="text" name="bloodtype" value={bloodtype} onChange={(e) => setBloodType(e.target.value)} id="" placeholder='blood type' className='border-b w-full h-[30px] text-gray-400 text-[15px] outline-none '/>
            <input type="number" name="first name" value={phone === 0 ? '' : phone} onChange={(e) => setPhone(Number(e.target.value))}  id=""  className='border-b w-full h-[30px] text-gray-400 text-[15px] outline-none appearance-none '/>
          </div>
          <div className='flex space-x-2'>
            {user?.photo ? 
              <img src={user.photo}  alt="" className='rounded-full h-[40px] w-[40px] ' /> :

              photo.length > 0 ? 
              photo.map((photo) => {
                return (
                  <img key={photo.filePath} src={photo.filePath}  alt="" className='rounded-full h-[40px] w-[40px] ' />
                )
              }) :

              <div className='flex justify-center bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden h-[40px] w-[40px] '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-[50px] w-[50px] relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
            }
            <ImageUploader photo={photo} setPhoto={setPhoto} />
          </div>
          <button className=' bg-blue-600 w-full h-[30px] text-white text-[12px] rounded-md '>Update profile</button>
        </form>
        <button className=' bg-blue-600 w-full h-[30px] text-white text-[12px] rounded-md ' onClick={() => console.log(photo[0].filePath)}>Whatever</button>
    </div>
  )
}

export default PatientSettingsPage