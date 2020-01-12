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

var badgeContainer;
var badgeSpan;
var badgeListingsShowing;
var _offeringContainers;

function ShowHiddenBadge(offeringContainers)
{
    if (badgeContainer == null)
    {
        badgeSpan = document.createElement("span");
        badgeSpan.style.lineHeight = "50px";
        badgeSpan.style.color = "white";
        badgeSpan.style.pointerEvents = "none";

        badgeContainer = document.createElement("div");
        badgeContainer.style.position = "fixed";
        badgeContainer.style.bottom = "25px";
        badgeContainer.style.left = "25px";
        badgeContainer.style.width = "50px";
        badgeContainer.style.height = "50px";
        badgeContainer.style.borderRadius = "50%";
        badgeContainer.style.textAlign = "center";
        badgeContainer.style.cursor = "pointer";

        badgeContainer.addEventListener("click", function(event)
        {
            for (var i = 0; i < _offeringContainers.length; i++)
            {
                _offeringContainers[i].style.display = badgeListingsShowing ? "none" : "block";
            }
            this.style.backgroundColor = badgeListingsShowing ? "orange" : "red";
            this.setAttribute("title", badgeListingsShowing ? "Verborgen huizen" : "Huizen te verbergen");
            badgeListingsShowing = !showing;
        });

        badgeContainer.appendChild(badgeSpan);
        document.body.appendChild(badgeContainer);
    }

    _offeringContainers = offeringContainers;
    if (offeringContainers.length == 0)
    {
        badgeContainer.style.display = "none";
    }
    else
    {        
        badgeListingsShowing = false;
        badgeContainer.setAttribute("title", "Verborgen huizen");
        badgeContainer.style.backgroundColor = "orange";
        badgeSpan.innerText = offeringContainers.length.toString();

        badgeContainer.style.display = "block";
    }
}

function Run()
{
    setTimeout(function()
    {
        var offeringContainers = document.querySelectorAll(itemSelector);
        if (offeringContainers.length == 0)
        {
            ShowHiddenBadge([]);
            return;
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

        ShowHiddenBadge(hiddenOfferings);
    }, 1000);
}

Run();

// Check for url changes
var currentUrl = window.location.href;
setInterval(function()
{
    if (currentUrl != window.location.href)
    {
        Run();
        currentUrl = window.location.href;
    }
}, 50);
