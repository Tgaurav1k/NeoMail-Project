import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  useGetAllEmails();
  const {emails, searchText} = useSelector(store=>store.app);

  // filter for search mail
  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(()=>{
    const filteredEmail = emails.filter((email)=>{
      if (!searchText) return true;
      
      const searchLower = searchText.toLowerCase();
      const subject = email.subject?.toLowerCase() || "";
      const to = email.to?.toLowerCase() || "";
      const message = email.message?.toLowerCase() || "";
      const senderName = email.userId?.fullname?.toLowerCase() || "";
      const senderEmail = email.userId?.email?.toLowerCase() || "";
      
      // Search in subject, to, message, sender name, and sender email
      return subject.includes(searchLower) || 
             to.includes(searchLower) || 
             message.includes(searchLower) ||
             senderName.includes(searchLower) ||
             senderEmail.includes(searchLower);
    });
    setFilterEmail(filteredEmail);
  },[searchText, emails])

  return (
    <div>
      {
        // apply on filter mail
        filterEmail && filterEmail?.map((email)=> <Email key={email._id} email={email}/> )
      }
        
    </div>
  )
}

export default Emails