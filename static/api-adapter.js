// static/api-adapter.js
// lightweight adapter to map localStorage-based functions to server API
const API_BASE = '';

async function api_getLocations() {
    const resp = await fetch('/api/locations');
    if (!resp.ok) throw new Error('Failed to fetch locations');
    return await resp.json();
}

async function api_createLocation(payload) {
    const resp = await fetch('/api/locations', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error('Create failed');
    return await resp.json();
}

async function api_updateLocation(id, payload) {
    const resp = await fetch(`/api/locations/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error('Update failed');
    return await resp.json();
}

async function api_deleteLocation(id) {
    const resp = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
    if (!resp.ok) throw new Error('Delete failed');
    return await resp.json();
}

// import/restore endpoints use form uploads
async function api_importExcel(file) {
    const fd = new FormData();
    fd.append('file', file);
    const resp = await fetch('/api/import', { method: 'POST', body: fd });
    return await resp.json();
}

async function api_exportExcel() {
    window.location = '/api/export';
}

async function api_backupDownload() {
    window.location = '/api/backup';
}

async function api_restoreBackup(file) {
    const fd = new FormData();
    fd.append('file', file);
    const resp = await fetch('/api/restore', { method: 'POST', body: fd });
    return await resp.json();
}
