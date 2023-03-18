import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { recieveMessageRoute, sendMessageRoute } from "../api/chatApi";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, socket }) {
	const [messages, setMessages] = useState([]);
	const scrollRef = useRef();
	const [arrivalMessage, setArrivalMessage] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			const data = await JSON.parse(localStorage.getItem("user"));
			const response = await axios.post(recieveMessageRoute, {
				from: data.id,
				to: currentChat.to,
			});
			setMessages(response.data);
		};
		fetch();
	}, [currentChat]);
	// currentChat;
	useEffect(() => {
		const getCurrentChat = async () => {
			if (currentChat) {
				await JSON.parse(localStorage.getItem("user")).id;
			}
		};
		getCurrentChat();
	}, [currentChat]);

	const handleSendMsg = async (msg) => {
		const data = await JSON.parse(localStorage.getItem("user"));
		socket.current.emit("send-msg", {
			to: currentChat.to,
			from: data.id,
			msg,
		});
		await axios.post(sendMessageRoute, {
			from: data.id,
			to: currentChat.to,
			message: msg,
		});
		const msgs = [...messages];
		msgs.push({ fromSelf: true, message: msg });
		setMessages(msgs);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-recieve", (msg) => {
				console.log("msg-recieve");
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Container>
			<div className="chat-messages">
				{messages.map((message, index) => {
					return (
						<div ref={scrollRef} key={index}>
							<div
								className={`message ${
									message.fromSelf ? "sended" : "recieved"
								}`}
							>
								<div className="content">
									<p>{message.message}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<ChatInput handleSendMsg={handleSendMsg} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #e0e0e0;
	overflow: hidden;
	.chat-messages {
		padding: 1rem 2rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #fff;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.message {
			display: flex;
			align-items: center;
			.content {
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;
				color: #000;
				background-color: #1976d2;
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					max-width: 70%;
				}
			}
		}
		.sended {
			justify-content: flex-end;
			.content {
				background-color: #1976d2;
				color: #fff;
			}
		}
		.recieved {
			justify-content: flex-start;
			.content {
				color: #fff;
				/* background-color: #9900ff20; */
			}
		}
	}
`;
