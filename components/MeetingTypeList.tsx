'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard';
import { useRouter } from 'next/router';

const MeetingTypeList = () => {
const router = useRouter();
const createMeeting = () => {};
 const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(); 
 return (
	<section className='grid grid-cols-1 gap-5 md:grid grid-cols-2 xl: grid-cols-4'>
	  <HomeCard 
		  img="/icons/add-meeting.svg"
		  title="New Meetng"
		  description="Start an Instant Meeting"
		  handleClick={() => setMeetingState('isJoiningMeeting')}	
		  className="bg-orange-1"
	  	/>

<HomeCard 
		  img="/icons/add-meeting.svg"
		  title="New Meetng"
		  description="Start an Instant Meeting"
		  handleClick={() => setMeetingState('isJoiningMeeting')}	
		  className="bg-blue-1"
	  	/>

	<HomeCard 
		  img="/icons/schedule.svg"
		  title='Schedule Meeting'
		  description="Plan your Meeting"
		  handleClick={() => setMeetingState('isSchedulingMeeting')}	
	  	  className='bg-purple-1'
		/>

<HomeCard 
		  img="/icons/jon-meeting.svg"
		  title="Join Meeting"
		  description="via invitation link"
		  handleClick={() => setMeetingState('isJoiningMeeting')}	
		  className='bg-yellow-1'
	  	/>

		<MeetingModal 
			isOpen={meetingState === 'isInstantMeeting'}
			onClose={()=> {setMeetingState(undefined)}}
			title="Start an Instant Meeting"
			className='text-center'
			buttonText	="Start Meeting"
			handleClick={createMeeting}
		/>
	</section>
  )
}

export default MeetingTypeList
