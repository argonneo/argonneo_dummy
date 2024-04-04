
// If any of the elements are in the viewport then show them
let observer = new IntersectionObserver(updates => {
	updates.forEach(update => {
		if (update.isIntersecting) {
			update.target.classList.add('visible');
		} else {
			//update.target.classList.remove('visible');
		}
	});
}, { threshold: 0 });

// Select all elements with this selector
[...document.querySelectorAll('.animate-zoom-in, .animate-fade-in-left, .animate-fade-in-right, .animate-fade-in-up, .animate-fade-in-down')].forEach(element => {
    observer.observe(element);
});