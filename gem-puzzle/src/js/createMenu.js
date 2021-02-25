const createStatic = (wrapperSel) => {
  const wrapper = document.querySelector(wrapperSel);
  wrapper.innerHTML += `
    <div class="menu">
        <div class="info-block">
            <div class="time">Time : 0s</div>
            <div class="steps">Steps: 0</div>
            <select name="" class="select">
                <option value="9">3x3</option>
                <option value="16" selected>4x4</option>
                <option value="25">5x5</option>
                <option value="36">6x6</option>
                <option value="49">7x7</option>
                <option value="64">8x8</option>
            </select>
        </div>
        <div class="btn-block">
            <button class="btn" id="newGame">New game</button>
            <button class="btn" id="solution">Solution</button>
            <button class="btn btn_active" id="sound">Sound</button>
            <button class="btn" id="save">Save</button>
            <button class="btn" id="record">Records</button>
            <button class="btn" id="load">Load saved</button>
        </div>
    </div>
    <div class="modal modal_final">
        
    </div>
    <div class="info-save"><div>Saved</div></div>
    <div class="modal modal-records">
        <div class="modal-records__content">
            
        </div>
        <div class="modal-records__close">
            <img src="./img/Vector.svg" alt="cross">
        </div>
    </div>
    <div class="overlay"></div>
    `;
};
export default createStatic;
