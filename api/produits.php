<?php
	// Connect to database
	require_once './db/database.php';
	$request_method = $_SERVER["REQUEST_METHOD"];


	function getProducts()
	{
		
		$query = "SELECT * FROM posts";
		$response = array();
		$stmt = EDatabase::prepare($query);
		$stmt->execute(array(':id' => $id));
		$response = $stmt->fetchAll(PDO::FETCH_BOTH);
		header('Content-Type: application/json');
		echo json_encode($response, JSON_PRETTY_PRINT);
	}
	
	function getProduct($id=0)
	{
		$query = "SELECT * FROM posts";
		if($id > 0)
		{
			$query .= " WHERE IDPosts=:id LIMIT 1";
		}
		$response = array();
		$stmt = EDatabase::prepare($query);
		$stmt->execute(array(':id' => $id));
		$response = $stmt->fetchAll(PDO::FETCH_BOTH);
		header('Content-Type: application/json');
		echo json_encode($response, JSON_PRETTY_PRINT);
	}

	function AddProduct()
	{

		$sql = "INSERT INTO posts (commentaire, datePost, postType) VALUES (:c, :dp, :pt)";
		$sth = EDatabase::prepare($sql);
		try {
			$sth->execute(array(
				':c' => $_POST["commentaire"],
				':dp' => date("Y-m-d"),
				':pt' => $_POST["postType"]
			));
		} catch (PDOException $e) {
			echo 'Problème de lecture de la base de données: ' . $e->getMessage();
			EDatabase::rollBack();
			return false;
		}
		
		header('Content-Type: application/json');
		echo json_encode($sth);
	}

	function deleteProduct($id)
	{
		$query = "DELETE FROM posts WHERE IDPosts=:id";
		$sth = EDatabase::prepare($query);
		try {
			$sth->bindParam(':id', $id, PDO::PARAM_INT);   
			$sth->execute();
		} catch (PDOException $e) {
			echo 'Problème de lecture de la base de données: ' . $e->getMessage();
			EDatabase::rollBack();
			return false;
		}

		header('Content-Type: application/json');
		echo json_encode($sth);
	}
	

	function updateProduct()
  	{
		// $_PUT = array(); //tableau qui va contenir les données reçues
		$tmp = (file_get_contents('php://input'));
		$_PUT = (json_decode($tmp, true));
		//construire la requête SQL
		$sql="UPDATE posts SET commentaire=:c, datePost=:dp, postType=:pt WHERE IDPosts=:id";
		
		var_dump($_PUT["commentaire"]);
		var_dump($_PUT["postType"]);
		var_dump($_PUT["id"]);
		$sth = EDatabase::prepare($sql);
		try {
			$sth->bindParam(':c', $_PUT["commentaire"]);
			$sth->bindParam(':dp', date("Y-m-d"));
			$sth->bindParam(':pt', $_PUT["postType"], PDO::PARAM_STR);
			$sth->bindParam(':id', $_PUT["id"], PDO::PARAM_INT);
			$sth->execute();
		} catch (PDOException $e) {
			echo 'Problème de lecture de la base de données: ' . $e->getMessage();
			EDatabase::rollBack();
			return false;
		}
		
		header('Content-Type: application/json');
		echo json_encode($sth);
	}

	switch($request_method)
	{
		
		case 'GET':
			// Retrive Products
			if(!empty($_GET["id"]))
			{
				$id=intval($_GET["id"]);
				getProduct($id);
			}
			else
			{
				getProducts();
			}
			break;

		case 'POST':
			// Ajouter un produit
			AddProduct();
			break;

		case 'DELETE':
    		// Supprimer un produit
			$id = intval($_GET["id"]);
			deleteProduct($id);
			break;

		case 'PUT':
			// Modifier un produit
			updateProduct();
			break;

		default:
			// Invalid Request Method
			header("HTTP/1.0 405 Method Not Allowed");
			break;

	}
?>