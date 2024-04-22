'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';

const MeetingTypeList = () => {
const router = useRouter();
const { user } = useUser();
const client = useStreamVideoClient();
const [values, setValues] = useState({
	dateTime: new Date(),
	description: '',
	link: '',
});

const { toast } = useToast();

const [callDetails, setCallDetails] = useState<Call>();

const createMeeting = async () => {
	if (!client || !user) return;

	try {
		const id = crypto.randomUUID();
		const call = client.call('default',  id);
		if (!call) throw new Error('Failed to create call');

		const startsAt  =values.dateTime.toISOString() || new Date(Date.now()).toISOString();
		const description = values.description || 'Instant Meeting';
		
		await call.getOrCreate({
			data: {
				starts_at: startsAt,
				custom: {
					description
				}
			}
		})

		setCallDetails(call);

		if(!values.description) {
			router.push(`/meeting/${call.id}`)
		}
		
	} catch (error) {
		console.log(error);
		toast({
			title: 'Scheduled: Catch up',
			description: 'Friday, february 10, 2024',
		})
	}
};
 const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(); 
 return (
	<section className='grid grid-cols-1 gap-5 md:grid grid-cols-2 xl: grid-cols-4'>
	  <HomeCard 
		  img="/icons/add-meeting.svg"
		  title="New Meeting"
		  description="Start an Instant Meeting"
		  handleClick={() => setMeetingState('isInstantMeeting')}	
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
