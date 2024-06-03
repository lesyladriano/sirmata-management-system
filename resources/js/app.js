import './bootstrap';


axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token,
};

// Laravel's JavaScript scaffolding...
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};