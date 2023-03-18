import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute } from "../api/chatApi";
import shopApi from "../api/shopApi";
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
// import { allUsersRoute } from "../api/chatApi";

export default function Chat() {
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState(undefined);

	const search = useLocation().search;
	// init chat
	useEffect(() => {
		try {
			const query = async () => {
				const user = await JSON.parse(localStorage.getItem("user"));
				const supplier = new URLSearchParams(search).get("supplier");
				if (supplier) {
					const response = await shopApi.getShop({
						shopId: parseInt(supplier),
					});
					await axios.post("http://localhost:5000/api/create-contact", {
						from: user.id,
						fromName: user.email,
						to: supplier,
						toName: response.data.name,
					});
					const fetch = async () => {
						const data = await axios.post(allUsersRoute, {
							from: user.id,
						});
						console.log(data);
						setContacts(data.data.history);
					};
					fetch();
				}
			};
			query();
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		const fetch = async () => {
			setCurrentUser(await JSON.parse(localStorage.getItem("user")));
		};
		fetch();
	}, []);
	useEffect(() => {
		if (currentUser) {
			socket.current = io("http://localhost:5000");
			socket.current.emit("add-user", currentUser.id);
		}
	}, [currentUser]);

	useEffect(() => {
		try {
			const fetch = async () => {
				if (currentUser) {
					const data = await axios.post(allUsersRoute, {
						from: currentUser.id,
					});
					setContacts(data.data.history);
				}
			};
			fetch();
		} catch (e) {
			console.log(e);
		}
	}, [currentUser]);

	const handleChatChange = (chat) => {
		console.log(chat);
		setCurrentChat({ to: chat.to.id, from: chat.from.id });
	};
	return (
		<Container>
			<div className="container">
				{contacts === [] ? (
					<></>
				) : (
					<Contacts contacts={contacts} changeChat={handleChatChange} />
				)}
				{currentChat === undefined ? (
					<></>
				) : (
					<ChatContainer currentChat={currentChat} socket={socket} />
				)}
			</div>
		</Container>
	);
}

const Container = styled.div`
	padding-top: 32px;
	padding-bottom: 44px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #fff;
	.container {
		height: 85vh;
		width: 85vw;
		/* background-color: #00000076; */
		background-color: #eeeeee;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
