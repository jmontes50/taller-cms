import { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService";
import Navtop from "../components/Navtop";

export default function BlogView() {
	const [posts, setPosts] = useState([]);

	const obtainPosts = async () => {
		try {
			const postsObtained = await getBlogs();
			setPosts(postsObtained);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		obtainPosts();
	}, []);

	return (
		<>
			<Navtop />
			<div className="container">
				<h1 className="text-center py-4">CodiBlog!</h1>
				<div className="row">
					<div className="col-12">
						{posts.map((item, i) => (
							<div className="card mb-3">
								<div className="card-body">
									<h3 className="card-title">{item.titulo}</h3>
									{/* <p className="card-text">{item.descripcion}</p> */}
									<p
										className="card-text"
										dangerouslySetInnerHTML={{ __html: item.descripcion }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
