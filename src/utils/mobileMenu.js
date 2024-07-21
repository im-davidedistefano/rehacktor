export default function mobileMenu() {
    let button = document.querySelector('#mobileMenu');
    let mobileMenuList = document.querySelector('#menuListMobile')

    if(!button.classList.contains('active')) {
      button.classList.add('active');
      mobileMenuList.style.display = "flex";
    } else {
      button.classList.remove('active');
        mobileMenuList.style.display = "none";
    }
}
