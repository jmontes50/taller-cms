import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import NavSidebar from "../components/NavSidebar";
import { Container, Row, Col } from "react-bootstrap";
import SunEditor from "suneditor-react";
import { crearPost } from "../services/blogService";
import Swal from "sweetalert2"

export default function CrearPostView() {
	const [post, setPost] = useState({
		titulo: "",
		descripcion: "",
		usuarioId: 3,
	});

    const { user } = useContext(UserContext);

	const handleEditorChange = (content) => {
		setPost({ ...post, descripcion: content });
	};

    const handleCrearPost = async () => {
        try {
            await crearPost(post, user)
			Swal.fire({
				icon:"success",
				title:"Post Creado"
			})
        } catch (error) {
            console.log(error)
        }
    }

	return (
		<Container fluid>
			<Row className="flex-xl-nowrap">
				<Col as={NavSidebar} xs={12} md={3} lg={2} />
				<Col xs={12} md={9} lg={10}>
					<h1 className="m-4">Crear Post</h1>
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<div>
										<div className="mb-3">
											<label className="form-label">Título del Post</label>
											<input
												type="text"
												className="form-control"
												value={post.titulo}
												onChange={(e) => {
													setPost({ ...post, titulo: e.target.value });
												}}
											/>
										</div>
										{/* <div className="mb-3">
											<label className="form-label">Título del Post</label>
											<input type="text" className="form-control" />
										</div> */}
										<div className="mb-3">
											<label className="form-label">Contenido del Post</label>
											<SunEditor
												style={{ height: "600px" }}
												onChange={handleEditorChange}
											/>
										</div>
										<button className="btn btn-dark btn-lg my-2" onClick={handleCrearPost}>
											Guardar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
