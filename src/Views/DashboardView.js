import { useState, useEffect } from "react";
import NavSidebar from "../components/NavSidebar";
import { Container, Row, Col } from "react-bootstrap";
import { DataGrid } from "@material-ui/data-grid";
import { Bar } from "react-chartjs-2";
import { getAuthors, getBlogs } from "../services/blogService";

export default function DashboardView() {
	const [blogs, setBlogs] = useState([]);
	const [authors, setAuthors] = useState([]);

	const obtainData = async () => {
		try {
			const blogsObtained = await getBlogs();
			setBlogs(blogsObtained);
			const authorsObtained = await getAuthors();
			setAuthors(authorsObtained);
		} catch (error) {
			console.error(error);
		}
	};

	const findPosts = () => {
		let cantByAuthor = [];
		for (let i = 0; i < authors.length; i++) {
			let cant = 0;
			for (let j = 0; j < blogs.length; j++) {
				if (authors[i].id === blogs[j].usuarioId) {
					cant++;
				}
			}
			cantByAuthor.push(cant);
		}
		return cantByAuthor;
	};

	const columns = [
		{
			field: "titulo",
			headerName: "Título",
			width: 200,
			editable: false,
		},
		{
			field: "creado",
			headerName: "Fecha de creación",
			width: 200,
			editable: false,
			renderCell: (params) => {
				console.log(params);
				return (
					<div className="rowitem">{`${params.row.creado.slice(0, 10)}`}</div>
				);
			},
		},
		{
			field: "usuario",
			headerName: "Autor",
			width: 150,
			editable: false,
			renderCell: (params) => {
				console.log(params);
				return (
					<div className="rowitem">{`${params.row.usuario.nombre} ${params.row.usuario.apellido}`}</div>
				);
			},
		},
	];

	useEffect(() => {
		obtainData();
	}, []);

	let data = {
		labels: blogs.map((item) => item.usuario.nombre),
		datasets: [
			{
				data: findPosts(),
        label:'Columnas',
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
					"rgba(255, 159, 64, 0.6)",
					"rgba(255, 99, 132, 0.6)",
				],
			},
		],
	};

	return (
		<Container fluid>
			<Row className="flex-xl-nowrap">
				<Col as={NavSidebar} xs={12} md={3} lg={2} />
				<Col xs={12} md={9} lg={10}>
					<h1 className="m-4">Dashboard</h1>
					<div className="row p-2">
						<div className="col-sm-12 col-md-6">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Blogs Escritos</h4>
									<div style={{ height: 400, width: "100%" }}>
										<DataGrid
											bulkActionButtons={false}
											rows={blogs}
											columns={columns}
											pageSize={5}
											checkboxSelection
											disableSelectionOnClick
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-12 col-md-6">
							<div className="card">
								<div className="card-body" style={{ height: 480 }}>
									<h4 className="card-title">Blogs Escritos</h4>
									<Bar
										data={data}
										options={{
											title: {
												text: "Artículos por autor",
												fontSize: 25,
											},
											legend: {
												labels: {
													fontColor: "#000",
												},
											},
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
