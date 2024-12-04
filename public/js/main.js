(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$nav = $('#nav'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});

	// Menu.
		$('<a href="#navPanel" class="navPanelToggle">Menu</a>')
			.appendTo($header);

		$(	'<div id="navPanel">' +
				'<nav>' +
					$nav.navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'is-navPanel-visible',
					side: 'right'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() { return $header.outerHeight() - 5 - 64; }
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$body.addClass('header-alt');

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() - 64,
				terminate:	function() { $header.removeClass('alt'); $body.removeClass('header-alt'); },
				enter:		function() { $header.addClass('alt'); $body.addClass('header-alt'); },
				leave:		function() { $header.removeClass('alt'); $body.removeClass('header-alt'); $header.addClass('reveal'); }
			});

		}

	// Banner.

		// Hack: Fix flex min-height on IE.
			if (browser.name == 'ie') {
				$window.on('resize.ie-banner-fix', function() {

					var h = $banner.height();

					if (h > $window.height())
						$banner.css('height', 'auto');
					else
						$banner.css('height', h);

				}).trigger('resize.ie-banner-fix');
			}

})(jQuery);


// Ticket addition

document.addEventListener("DOMContentLoaded", () => {
    const ticketQuantity = document.getElementById("ticketQuantity");
    const subtotalElement = document.getElementById("subtotal");

    // Ticket price
    const ticketPrice = 200;

    // Update subtotal whenever quantity changes
    ticketQuantity.addEventListener("change", () => {
        const quantity = parseInt(ticketQuantity.value, 10);
        const subtotal = ticketPrice * quantity;
        subtotalElement.textContent = `$${subtotal}`;
    });
});


// Payment modal

document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkoutButton");
    const modal = document.getElementById("checkoutModal");
    const closeButton = modal.querySelector(".close");
    const modalDetails = document.getElementById("modalDetails");

    const ticketQuantity = document.getElementById("ticketQuantity");
    const subtotalElement = document.getElementById("subtotal");

    // Open modal and populate details
    checkoutButton.addEventListener("click", (event) => {
        event.preventDefault();

        const quantity = parseInt(ticketQuantity.value, 10);

        if (quantity === 0) {
            // Alert and highlight the dropdown if no tickets are added
            alert("I think you may have forgotten to add something. Please add your ticket quantity to proceed.");
			// Focus on the dropdown
            ticketQuantity.focus();
			// Highlight the dropdown
            ticketQuantity.style.border = "2px solid red";

			// Stop further execution
            return;
        }
		
        const subtotal = subtotalElement.textContent;

        modalDetails.textContent = `You are purchasing ${quantity} ticket(s) for a total of ${subtotal}.`;
		// Show modal
        modal.style.display = "flex";
    });

    // Close modal
    closeButton.addEventListener("click", () => {
		// Hide modal
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle payment form submission
    const paymentForm = document.getElementById("paymentForm");
    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();
		
        alert("Payment submitted successfully!");
		// Hide modal after submission
        modal.style.display = "none";
    });
});