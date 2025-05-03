<script>

  /**
        * Assignment name: Inclass Svelte + D3
        * First name: Shreya
        * Last name: Juka Reddy
        * Student ID: 801391084
    */

    import { tooltip } from "$lib/state/state.svelte";
    
</script>

<div id="tooltip">
    <div class="tooltip-title">{tooltip.title}</div>
    <div><i>{tooltip.region}</i></div>
    <ul>
        <li>{tooltip.distance} Km, ~ {tooltip.time} hours</li>
        <li>{tooltip.difficulty}</li>
        <li>{tooltip.season}</li>
    </ul>
</div>



<style>
    #tooltip {
        position: absolute;
        display: none;
        background: #fff;
        box-shadow: 3px 3px 3px 0px rgb(92 92 92 / 0.5);
        border: 1px solid #ddd;
        font-size: 12px;
        font-weight: 500;
        padding: 8px;
        min-width: 160px;
        color: #333;
    }
    .tooltip-title {
        color: #000;
        font-size: 14px;
        font-weight: 600;
    }
    #tooltip ul {
        margin: 5px 0 0 0;
        padding-left: 20px;
    }
</style>