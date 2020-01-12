/** Label detection settings **/
var itemSelector = "ol.search-results > li.search-result";
var labelsSelector = "ul.labels > li.label";
var illegalLabels = [
    "onder optie",
    "onder bod",
    "verkocht onder voorbehoud"
];

function ContainsIllegalLabel(offeringContainer)
{
    var labelContainers = offeringContainer.querySelectorAll(labelsSelector);
    var labels = [];
    for (var i = 0; i < labelContainers.length; i++)
    {
        var labelContainer = labelContainers[i];
        labels.push(
            labelContainer.innerText.toLowerCase());
    }
    
    return labels.some(function(label)
    {
        var labelIndex = illegalLabels.indexOf(label);
        return labelIndex != -1;
    });
}

function ShowHiddenBadge(offeringContainers)
{
    var badgeSpan = document.createElement("span");
    badgeSpan.style.lineHeight = "50px";
    badgeSpan.style.color = "white";
    badgeSpan.style.pointerEvents = "none";
    badgeSpan.innerText = offeringContainers.length.toString();
    
    var badgeContainer = document.createElement("div");
    badgeContainer.style.backgroundColor = "orange";
    badgeContainer.style.position = "fixed";
    badgeContainer.style.bottom = "25px";
    badgeContainer.style.left = "25px";
    badgeContainer.style.width = "50px";
    badgeContainer.style.height = "50px";
    badgeContainer.style.borderRadius = "50%";
    badgeContainer.style.textAlign = "center";
    badgeContainer.style.cursor = "pointer";
    
    badgeContainer.setAttribute("title", "Verborgen huizen");
    
    var showing = false;
    badgeContainer.addEventListener("click", function(event)
    {
        for (var i = 0; i < offeringContainers.length; i++)
        {
            offeringContainers[i].style.display = showing ? "none" : "block";
        }
        this.style.backgroundColor = showing ? "orange" : "red";
        this.setAttribute("title", showing ? "Verborgen huizen" : "Huizen te verbergen");
        showing = !showing;
    });
    
    badgeContainer.appendChild(badgeSpan);
    
    document.body.appendChild(badgeContainer);
}

setTimeout(function()
{
    var offeringContainers = document.querySelectorAll(itemSelector);
    console.log(offeringContainers);
    if (offeringContainers.length == 0)
    {
        return false;
    }
    
    var hiddenOfferings = [];
    for (var i = 0; i < offeringContainers.length; i++)
    {
        var offeringContainer = offeringContainers[i];
        if (ContainsIllegalLabel(offeringContainer))
        {
            offeringContainer.style.display = "none";
            hiddenOfferings.push(offeringContainer);
        }
    }
    
    if (hiddenOfferings.length > 0)
    {
        ShowHiddenBadge(hiddenOfferings);
    }
    
    return true;
}, 1000);
