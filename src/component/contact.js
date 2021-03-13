

import React ,{useContext , useState, useEffect } from 'react';

import Context from './../context/Context';

import Loader from './Loader'




export default function Contact() {


    const { SendMessage ,ClearError, MessageError,success,loading } = useContext(Context)

    const [name , setName ] = useState('');
    const [email , setEmail ] = useState('');
    const [subject , setSubject] = useState(''); 
    const [message, setMessage ] = useState('')
   
    const[err, setErr]= useState('');


    
    const _handelSubmit = (e)=>{
        e.preventDefault(); 
        //console.log(tel.slice(1));
        if ( name && email && subject && message  ){
           const NewMessage = { name : name, email : email, subject :subject,message:message}
            SendMessage(NewMessage);
            console.log(NewMessage); 
            _clearFrom()
           // console.log('sumbitted :', NewMessage); 
        }else{
            setErr('Please fill in all the fields')
        }
        
    }

    const _clearFrom = ()=>{
        setName('');
        setEmail('');
        setSubject('');
        ClearError()
        setMessage('');
    }

    return (


        
        <form   name="contact-form" id="contact-form" onSubmit={_handelSubmit}>
            { err || MessageError? <p className="border text-danger py-2 px-4 ">{err||MessageError}</p>:null}
            {success ? <p className="border text-success py-2 px-4">Thank You Your Message Has Been Sent!</p>:null}
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group app-label">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" type="text" className="form-control" placeholder="Enter your name.." value={name}
                onChange={(e)=>{ ClearError(); setErr(''); setName(e.target.value)}} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group app-label">
              <label htmlFor="email">Email address</label>
              <input name="email" id="email" type="email" className="form-control" placeholder="Enter your email.."value={email}
                onChange={(e)=>{ ClearError(); setErr(''); setEmail(e.target.value)}} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group app-label">
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" id="subject" placeholder="Enter Subject.." value={subject}
                onChange={(e)=>{ ClearError(); setErr(''); setSubject(e.target.value)}} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group app-label">
              <label htmlFor="comments">Message</label>
              <textarea name="comments" id="comments" rows={3} className="form-control" placeholder="Enter message.." defaultValue={""} value={message}
                onChange={(e)=>{ ClearError(); setErr(''); setMessage(e.target.value)}}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button type="submit" id="submit" name="send" className="btn btn-warning">{loading?<Loader/>:<>Send Message <i className="mdi mdi-telegram ml-2" /></>}</button>
            <div id="simple-msg" />
          </div>
        </div>
      </form>
    )
}
