<script lang="ts">
	import type { PageData } from './$types';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	export let data: PageData;

	let merchandises = data.merchandises;
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

	<div class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
		{#each merchandises as merchandise}
			<a href="/item/{merchandise._id}" class="group text-sm">
				<div
					class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
				>
					<Splide aria-label="My Favorite Images">
						{#each merchandise.photo as photo}
							<SplideSlide>
								<img
									src={photo}
									alt="White fabric pouch with white zipper, black zipper pull, and black elastic loop."
									class="h-96 w-full object-cover object-center"
								/>
							</SplideSlide>
						{/each}
					</Splide>
				</div>
				<h3 class="mt-4 font-medium text-gray-900">{merchandise.name}</h3>
				<p class="italic text-gray-500">White and Black</p>
				<p class="mt-2 font-medium text-gray-900">RM {merchandise.price.combinePrice}</p>
			</a>
		{/each}
		<!-- More products... -->
	</div>
</div>
