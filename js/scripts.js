jQuery(function () {

  // LOADER
  $(window).on('load', function () {
    $('#clock-loader').fadeOut(600, function () {
      $(this).remove();
    });
  });

  const watches = [
    { name: "Classic Leather", price: "$199", img: "./images/watch1.webp", category: "classic" },
    { name: "Minimal Chrono", price: "$249", img: "./images/watch2.webp", category: "minimal" },
    { name: "Smart Timepiece", price: "$299", img: "./images/watch3.webp", category: "smart" },
    { name: "Minimal Chrono", price: "$199", img: "./images/watch4.webp", category: "minimal" },
    { name: "Classic Leather", price: "$249", img: "./images/watch5.webp", category: "classic" },
    { name: "Timepiece", price: "$299", img: "./images/watch6.webp", category: "classic" }
  ];

  function renderProducts(category = 'all', keyword = '') {
    $('#product-list').empty();
    const filtered = watches.filter(w => {
      const matchesCategory = category === 'all' || w.category === category;
      const matchesSearch = w.name.toLowerCase().includes(keyword.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      $('#product-list').append('<p class="alert alert-warning font-monospace fw-bolder text-center text-muted">No watches found.</p>');
      return;
    }

    const highlight = (text, term) => {
      if (!term) return text;
      const regex = new RegExp(`(${term})`, 'gi');
      return text.replace(regex, `<mark>$1</mark>`);
    };

    filtered.forEach((watch, index) => {
      const highlightedName = highlight(watch.name, keyword);
      $('#product-list').append(`
        <div class="col-xl-4 col-md-4 col-6">
          <div class="card h-100">
            <img src="${watch.img}" alt="${watch.name}" class="card-img-top object-fit-cover" width="100%" height="100%" loading="lazy" />
            <div class="card-body text-center">
              <h5 class="card-title" aria-level="3">${highlightedName}</h5>
              <p class="card-text badge text-bg-dark rounded-pill d-table mx-auto">${watch.price}</p>
              <button class="btn btn-outline-dark view-details" data-index="${index}">View Details</button>
              </div>
            </div>
        </div>
      `);
    });
  }

  let currentCategory = 'all';

  renderProducts();

  $(document).on('click', '.filter-btn', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    currentCategory = $(this).data('category');
    const search = $('#searchInput').val();
    renderProducts(currentCategory, search);
  });

  $('#searchInput').on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault(); // Prevent form submission
      const search = $('#searchInput').val();
      renderProducts(currentCategory, search);

      // Scroll to first matching product
      const firstMatch = document.querySelector('#product-list .card');
      if (firstMatch) {
        $('html, body').animate({
          scrollTop: $('#product-list').offset().top - 50
        }, 500);
      }
    }
  });

  $(document).on('click', '.view-details', function () {
    const index = $(this).data('index');
    const watch = watches[index];
    $('#modalImage').attr('src', watch.img).attr('alt', watch.name);
    $('#productModalLabel').text(watch.name);
    $('#modalPrice').text(watch.price);
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  });


});