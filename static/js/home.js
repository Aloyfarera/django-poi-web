document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var segments = path.split('/').filter(Boolean);
    var type_u = segments[segments.length - 2];
    var chainId = segments[segments.length - 1];
    var b_category;
    if (path === '/') {
        b_category = '';
    } else {
        b_category = chainId.split("_")[0];
    }
    if (type_u === 'map') {
        fetch(`http://127.0.0.1:8000/api/locations/chain/${chainId}/`)
        .then(response => response.json())
        .then(data => {
            const descDiv = document.getElementById('_desc_div');
            if (descDiv) {
                descDiv.textContent = `${data.length} POIs`; 
            }
        })
        .catch(error => console.error('Error fetching POIs count:', error));
        
    } else if (type_u === 'b_category') {
        fetch(`http://127.0.0.1:8000/api/locations/b_category/${b_category}/`)
        .then(response => response.json())
        .then(data => {
            const descDiv = document.getElementById('_desc_div');
            if (descDiv) {
                const chainIds = data.map(item => item.chain_id);
                // Create a Set from chainIds to remove duplicates
                const uniqueChainIds = new Set(chainIds);
                descDiv.textContent = `${uniqueChainIds.size} Chains ${data.length} POIs`; 
            }
        })
        .catch(error => console.error('Error fetching POIs count:', error));
    }
    else if (path === '/') {
        fetch(`http://127.0.0.1:8000/api/locations`)
        .then(response => response.json())
        .then(data => {
            const descDiv = document.getElementById('_desc_div');
            if (descDiv) {
                const chainIds = data.map(item => item.chain_id);
                // Create a Set from chainIds to remove duplicates
                const uniqueChainIds = new Set(chainIds);
                descDiv.textContent = `${uniqueChainIds.size} Chains ${data.length} POIs`;  
            }
        })
        .catch(error => console.error('Error fetching POIs count:', error));
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var segments = path.split('/').filter(Boolean); // Remove empty segments
    var lastSegment = segments.length > 0 ? segments[segments.length - 1] : 'all_chains'; // Use 'all_chains' for root if segments array is empty

    var titleDiv = document.getElementById('_title_div');
    if (!titleDiv) {
        console.error("Failed to find the '_title_div' element.");
        return;
    }

    var categoryTextMap = {
        'food': 'All Food',
        'chains': 'All Chains',
        'shopping': 'All Shopping',
        'service': 'All Service',
        'all_chains': 'All Chains' // Special title for the root path
    };

    // Check if the last segment matches any predefined categories or the special root
    if (categoryTextMap[lastSegment]) {
        titleDiv.textContent = categoryTextMap[lastSegment];
    } else {
        // If not, assume it's a chain_id and display it directly
        titleDiv.textContent = lastSegment.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Format the chain_id to be more readable
    }
});
function o(element) {
    var category = element.getAttribute('data-category');
    if (category) {
        window.location.href = `/b_category/${category}/`;
    } else {
        // Handle the case where data-category is not available
        // Redirect based on the element's id or some other logic
        var id = element.id;
        if (id === '_all') {
            window.location.href = '/';
        }
        // Add more conditions here if needed for other ids
    }
}
function get_device() {
    let ua = navigator.userAgent.toLowerCase();
    //console.log("ua: ", ua);
    if (ua.toLowerCase().indexOf("iphone") >= 0)  { return "iphone";  }
    if (ua.toLowerCase().indexOf("ipod") >= 0)    { return "iphone";  }
    if (ua.toLowerCase().indexOf("ipad") >= 0)    { return "iphone";  }
    if (ua.toLowerCase().indexOf("android") >= 0) { return "android"; }
    return "pc";
}

let _my_device = get_device(); // at first!
console.log(_my_device);

function show_result(json_list) {
    _search.innerHTML = "";

    let div = document.createElement('div');
    div.style.width = '225px';
    div.style.marginBottom = '10px';
    div.style.textAlign = 'center';
    
    var result = "";
    if (json_list.length >= 50) {
        result = "Found more than 50.\nPlease use longer query.";
    } else {
        result = `${json_list.length}  maps found.`;
    }
    div.innerText = result;
    _search.appendChild(div);

    //__cache[q_value] = json_list;
    for (let i = 0; i < json_list.length; i++) {
        j = json_list[i];
        var id = j['id'];
        var name = j['e'];
        var description = j['d'];

        if (name === undefined) {
            name = id;
        }

        var icon = j['i'];

        let div = document.createElement('div');
        div.id = id;
        div.style.cursor = 'pointer';
        div.onclick = function () {
            change_map_from_list(this.id);
        };

        div.style.width = '225px';
        //div.style.backgroundColor = 'red';
        //div.style.position = 'relative';
        //

        var bgcolor = '#aaa';
        if (id.split("_").length == 4) {
            if (id.includes("_food")) {
                bgcolor = color_food;
            } else if (id.includes("_shopping")) {
                bgcolor = color_shopping;
            } else if (id.includes("_service")) {
                bgcolor = color_service;
            }
        }

        div.innerHTML = `

            <div style='
            padding:5px;
                _background:gray;
                _width:215px;
                margin: 0px 0 0 5px;
                display:inline-block;
                border: 2px #ccc solid;
                border-radius: 10px;
                background: #eee;
            '>

                <div style='
                    float:left;
                margin-left  :0px;
                margin-bottom:3px;
                margin-top   :2px;
                    width:40px;
                    height:40px;
                    overflow:hidden;
                '>
                    <img src='${icon}' style='
                        margin-top: -5px;
                        margin-left: -10px;
                        width:60px;
                        loading:lazy;
                    '>
                </div>

                <div style='
                font-size: 16px;
                line-height: 16px;
                    float:left;
                    margin-top:5px;
                    margin-left:5px;
                    width:150px;
                    _background:yellow;
                '>${name}</div>

                <div style='
                    float:left;
                    margin-left:5px;
                    width:150px;
                    font-size:12px;
                    _background:yellow;
                '>${description}</div>
            </div>
        `;
        _search.appendChild(div);	

    }

    if (json_list.length == 1) { // 1件だったら開く
        var new_id = json_list[0]['id'];
        var tag_id = _map_state.tag_list[0];
        if (new_id != tag_id) {
            change_map_from_list(new_id);
        }
    }
}

var _search_result_cache = {};

function do_search(q_value) {
    
    //_search.innerHTML = "";

    if (q_value in _search_result_cache) {
        show_result(_search_result_cache[q_value]);
    } else {
        let url = `${ROOT}/php/s.php?q=` + encodeURIComponent(q_value);
        fetch(url).then(res => {
            return res.json();
        }).then(json_list => {
            _search_result_cache[q_value] = json_list;
            show_result(json_list);
        });
    }
}

function start_search() {

    var q = _q.value.trim();
    //console.log('start_search: ' + q, q.length);

    if (q.length > 0) {
        _iframe.style.display = 'none';
        _search.style.display = null;
        _side_bottom.style.overflowY = 'scroll';

        if (q.length > 1) {
            do_search(q);
        } else {
            _search.innerHTML = "<div style='width:100%; text-align:center;'>2 charactors at least <br>for search.</div>";
        }
    } else {
        _iframe.style.display = 'block';
        _search.style.display = 'none';
        _side_bottom.style.overflowY = null;
    }
}

////////////////////////////////////////////////////////////////////////////////

function click_on_map() {
    if (_my_device != 'pc') {
        if (side_opened == true) {
            console.log('side_close');
            side_close();
        }
    }
}

function change_map_from_list(tag_id) {
    if (_my_device != 'pc') {
        side_close(() => {
            change_map(tag_id);
        });
    } else {
        change_map(tag_id);
    }
}

function side_open() {

    side_opened = true;
    _side.style.flexBasis = '235px';

    if (_my_device != 'pc') {
        setTimeout(() => { 
            _title_div.style.display = 'none';
            _desc_div.style.display = 'none';
        }, 10);
    }
}

var func_run_after_close = null;

function side_close(f = null) {

    side_opened = false;
    _side.style.flexBasis = '0';

    if (f != null) {
        func_run_after_close = f;
    }

    if (_my_device != 'pc') {
        setTimeout(() => { 
            _title_div.style.display = null;
            _desc_div.style.display = null;
        }, 200);
    }
}

function side_switch() {
    if (side_opened == true) {
        side_close();
    } else {
        side_open();
    }
}

////////////////////////////////////////////////////////////////////////////////	

var _about_lock_done = false;
function about_lock() {
    if (_about_lock_done == false) {
        _about_lock_done = true;
        alert("Zoom Lock Mode is ON.\nIn this mode, changing the map does not change the zoom level of the map automatically.");
    }
}

function switch_button(b) {
    if (b.style.color == 'white') {
        b.style.color = '#118ab2';
        b.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    } else {
        b.style.color = 'white';
        b.style.backgroundColor = '#118ab2';
    }

    if (b.innerText == 'lock') {
        __lock_zoom = false;
        b.innerText = 'lock_open';
    } else if (b.innerText == 'lock_open') {
        __lock_zoom = true;
        b.innerText = 'lock';
    }
}

