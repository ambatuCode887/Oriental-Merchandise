<script lang="ts">
	import type { PageData } from './$types';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { calculatePrice } from './calculatePrice';

	export let data: PageData;
	let merchandise = data.merchandise;
	let selectedSize = merchandise.dimensions_per_quantity.size[0].size;
	let selectedRegion = 'West Malaysia';

	function increaseQuantity() {
		if (quantity < merchandise.quantity) {
			quantity++;
		}
	}

	function decreaseQuantity() {
		if (quantity > 1) {
			quantity--;
		}
	}
	let quantity = 1;
	let subtotal = calculatePrice(selectedSize, quantity, merchandise);
</script>

<svelte:head>
	<title>Oriental Merchandise</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-neutral-300">
	<div class="relative">
		<div class="mx-auto max-w-7xl">
			<div class="relative shadow-xl sm:overflow-hidden sm:rounded-lg">
				<div class="absolute inset-0">
					<img class="h-full w-full object-cover" src="/klcc-malaysia.jpg" alt="klcc" />
					<div class="absolute inset-0 bg-red-500 mix-blend-multiply"></div>
				</div>
				<div class="relative px-4 py-16 sm:px-4 sm:py-24 lg:py-32 lg:px-6">
					<h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						<img src="/oresb-logo.svg" alt="logo" class="h-14 sm:h-24 mx-auto" />
						<span class="block text-white">Oriental Merchandise</span>
						<!-- <span class="block text-red-200">Oriental Real Estate</span> -->
					</h1>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-gray-50 min-h-screen">
		<div class="mx-auto max-w-7xl px-6 py-12 lg:flex lg:gap-16 lg:items-center lg:py-16">
			<!-- Product Image -->
			<div class="lg:flex-1">
				<div
					class="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transform transition duration-300"
				>
					<img src={merchandise.photo[0]} alt="" class="w-full object-cover object-center" />
					{#if merchandise.quantity >= 1}
						<div
							class="absolute top-2 right-2 bg-green-500 text-white text-xs uppercase tracking-wide px-3 py-1 rounded-full shadow-md"
						>
							In Stock
						</div>
					{:else}
						<div
							class="absolute top-2 right-2 bg-red-500 text-white text-xs uppercase tracking-wide px-3 py-1 rounded-full shadow-md"
						>
							Out of Stock
						</div>
					{/if}
				</div>
			</div>

			<!-- Product Details -->
			<div class="lg:flex-1">
				<div class="space-y-6">
					<!-- Title -->
					<h1 class="text-4xl font-extrabold text-gray-900">{merchandise.name}</h1>

					<!-- Price -->
					<p class="text-2xl font-semibold text-blue-600">
						RM{merchandise.price.combinePrice}
					</p>

					<!-- Description -->
					<p class="text-base text-gray-700 leading-relaxed">
						{merchandise.description}
					</p>

					<!-- Sizing Chart -->
					{#if merchandise.category === 'clothing'}
						<div class="mt-4">
							<h2 class="text-lg font-semibold text-gray-900 mb-2">Sizing Chart</h2>
							<table class="w-full bg-white border border-gray-300 rounded-md shadow">
								<thead class="bg-indigo-500 text-white text-sm">
									<tr>
										<th class="p-3">Size</th>
										<th class="p-3">Height (cm)</th>
										<th class="p-3">Length (cm)</th>
										<th class="p-3">Width (cm)</th>
									</tr>
								</thead>
								<tbody>
									{#each merchandise.dimensions_per_quantity.size as dimension}
										<tr class="text-sm text-gray-700 even:bg-gray-50">
											<td class="border px-4 py-2">{dimension.size}</td>
											<td class="border px-4 py-2">{dimension.height_cm}</td>
											<td class="border px-4 py-2">{dimension.length_cm}</td>
											<td class="border px-4 py-2">{dimension.width_cm}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}

					<!-- Size and Quantity -->
					<div class="space-y-4">
						{#if merchandise.category === 'clothing'}
							<div>
								<label for="size" class="block text-sm font-medium text-gray-900">Select Size</label
								>
								<select
									id="size"
									class="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-400"
									bind:value={selectedSize}
									on:change={() => (subtotal = calculatePrice(selectedSize, quantity, merchandise))}
								>
									{#each merchandise.dimensions_per_quantity.size as dimension}
										<option value={dimension.size}>{dimension.size}</option>
									{/each}
								</select>
							</div>
						{/if}

						<div class="flex items-center space-x-4">
							<button
								class="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-400"
								on:click={() => {
									quantity = Math.max(1, quantity - 1);
									subtotal = calculatePrice(selectedSize, quantity, merchandise);
								}}
							>
								-
							</button>
							<span class="text-lg font-semibold">{quantity}</span>
							<button
								class="mt-2 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-400"
								on:click={() => {
									quantity++;
									subtotal = calculatePrice(selectedSize, quantity, merchandise);
								}}
							>
								+
							</button>
						</div>
					</div>

					<!-- Subtotal and Stock -->
					<div class="mt-6">
						<p class="text-lg font-medium text-gray-700">
							Subtotal: <span class="text-xl font-bold text-green-600">RM {subtotal}</span>
						</p>
						{#if merchandise.quantity === 1}
							<p class="text-sm text-red-500">Only 1 left in stock</p>
						{:else}
							<p class="text-sm text-gray-500">Stock available: {merchandise.quantity}</p>
						{/if}
					</div>

					<!-- Add to Cart Button -->
					<!-- Product form -->
					<div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
						<section aria-labelledby="options-heading">
							<h2 id="options-heading" class="sr-only">Product options</h2>

							<form method="POST">
								<div class="sm:flex sm:justify-between"></div>
								<!--<div class="mt-4">
									<a href="#" class="group inline-flex text-sm text-gray-500 hover:text-gray-700">
										<span>What size should I buy?</span>
										<svg
											class="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
												clip-rule="evenodd"
											/>
										</svg>
									</a>
								</div>-->
								<div class="mt-10">
									<button
										type="submit"
										class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
										>Add to bag</button
									>
								</div>
								<div class="mt-6 text-center">
									<a href="/" class="group inline-flex text-base font-medium">
										<span class="text-gray-500 hover:text-gray-700">Back</span>
									</a>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
