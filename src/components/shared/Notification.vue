<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 error">
				<slot  name="body">
					<h3>No encontramos este producto 😳</h3>
					<p>Intenta con otra busqueda 😅</p>
				</slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.error {
		text-align: center;
		padding: 20px;
		min-height: 10vh;
	}
</style>
