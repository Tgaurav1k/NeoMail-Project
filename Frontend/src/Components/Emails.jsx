import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/usegetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  useGetAllEmails();
  const {emails, searchText} = useSelector(store=>store.app);

  // filter for search mail
  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(()=>{
    const filteredEmail = emails.filter((email)=>{

      // upper to lower text in search text
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
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