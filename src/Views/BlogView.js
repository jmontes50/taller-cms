import { useState, useEffect } from "react";
import { getBlogs } from "../services/blogService";
import Navtop from "../components/Navtop";
import { Carousel } from "react-bootstrap"
import pic1 from "../assets/foto1.jpg"
import pic2 from "../assets/foto2.jpg"
import pic3 from "../assets/foto3.jpg"

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
			<Carousel>
             <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic1}
                    alt="First slide"
                />
               
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic2}
                    alt="First slide"
                />
                
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={pic3}
                    alt="First slide"
                />
               
            </Carousel.Item>

        </Carousel>
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
