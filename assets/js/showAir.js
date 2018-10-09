var points;
function showAir(lat, long) {
const firstAreaLat = 0.26;
    const firstAreaLong = 0.3;
    const secondAreaLat = 0.52;
    const secondAreaLong = 0.6;
    const between = Math.sqrt(Math.pow(0.56,2)/2);
    // console.log(b)
    points = [[lat, long], [lat + firstAreaLat, long], [lat, long + firstAreaLong], [lat - firstAreaLat, long], [lat, long - firstAreaLong],
    [lat + secondAreaLat, long], [lat + between, long + between], [lat, long + secondAreaLong], [lat - between, long + between],
    [lat - secondAreaLat, long], [lat - between, long - between], [lat, long - secondAreaLong], [lat + between, long - between]];

    generateTriangle(points[0], points[1], points[2]);
    generateTriangle(points[0], points[2], points[3]);
    generateTriangle(points[0], points[3], points[4]);
    generateTriangle(points[0], points[4], points[1]);
    generateTriangle(points[0], points[5], points[6]);
    generateTriangle(points[0], points[6], points[7]);
    generateTriangle(points[0], points[7], points[8]);
    generateTriangle(points[0], points[8], points[9]);
    generateTriangle(points[0], points[9], points[10]);
    generateTriangle(points[0], points[10], points[11]);
    generateTriangle(points[0], points[11], points[12]);
    generateTriangle(points[0], points[12], points[5]);
}

function generateTriangle(p1, p2, p3) {
    const triangleCoords = [
        { lat: p1[0], lng: p1[1] },
        { lat: p2[0], lng: p2[1] },
        { lat: p3[0], lng: p3[1] },
    ]
    const triangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    triangle.setMap(map);
}