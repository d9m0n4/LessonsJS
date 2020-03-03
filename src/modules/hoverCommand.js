const ourTeam = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    commandPhoto.forEach(item => {
        const link = item.getAttribute('src');
        item.addEventListener('mouseenter', e => {
            e.target.src = e.target.dataset.img;
        });
        item.addEventListener('mouseout', e => {
            e.target.src = link;
        });
    });
};
export default ourTeam;
