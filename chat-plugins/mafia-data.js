// Data for the mafia chat plugin.

'use strict';

// This object contains all functions that execute in the callback function of any mafia class. Executed from the context of the executing player.
// Target is a MafiaPlayer object.
let MafiaFunctions = {
	copReport: function (target) {
		if (target.class.side === 'village') {
			return 'After investigating ' + target.name + ' you find out they\'re sided with the village.';
		} else if (target.class.side === 'village') {
			return 'After investigating ' + target.name + ' you find out they\'re sided with the mafia.';
		} else {
			return 'After investigating ' + target.name + ' you find out they\'re not sided with the village or mafia.';
		}
	},
	roleBlock: function (target) {
		target.roleBlocked = true;
		return 'You visit ' + target.name + ' during the night.';
	},
	protect: function (target) {
		target.invincible = true;
		return 'You give ' + target.name + ' their daily dose of medicine to keep them safe and sound.';
	},
	killTarget: function (target) {
		target.kill('The werewolf has eaten a tasty snack!');
	}
};

// Every role has a side they belong to, as well as all functions they have. These functions are objects with the targeting mechanics and a callback.
// events are atStart, onNight, onDay, onLynch.
exports.MafiaClasses = {
	villager: {
		name: "Villager",
		side: 'town',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR42u2b23HEIAxFLYYW0kJKS0/ZzrIlZItwvjyjsNgIIYmHdX/D2uL4CsQj2+ZyuVwul8vlcrlcLpfL5eosWLFT+77vpx0GYPc5rgjp8XxBqQ0HGqzmoitQWF+fH3ut2+COoHLgKMDg7qBqgIGDogMDB0UHFlsClZqSRwFVUqAGeQWK2mYGPZ4vOOtH5DqJ8hsLt2kCS+OPraBKBaAUMGvX5oABJ7CasYJaw1Dejd97FJWa41YaO2hBqgHGcY3V4I5jB21QuZdKp5SVu4IFKDwGaIw9eJ3XtXSQ/GraDugKy7roGxEYrrvCWVpogdL+AJoOCys4ygpYWA0UBiYNLWyLSxJYWNFVksDe6qw7iJOW6cpjqdOdIzOuoFDWlEebdIkGlOOjmYpHCjDcNtdOZKd0ZrflAJ456HSAt9ygs1iS4HdcgeLseiw3ZuGBXKXOAgDQ/upXz388X9AyZuLf4+dIj8NhhPST2vXErqp9FiUVw4ipVOu6qxqqBloJWMDTpUYqUp+Za1dTBlhMJpCjK3kcblEviUOxrLM4HUzh9IBU7awWd3E7mII6q6xbi9BWdxWPpyjQpNONm4K5WLmx5WDFUuOcyyRThLqGo1TpXdKQuxzQqMZbYLR+1Lddh1FhSTmnpv4q7UDEkUEdHZBOtbMJpDSxTLFTyj184OyMph/m3xWqkV1FTceamZRTlhypOPUWTa7TGsXscU8rzAhG40yQojhKalE633sJ1HxNsnfVPoR2JX3//G4tf7eIISdzWNQgrYDVvidajk8jpRgnljBycKPpNncdHJaxRO+mu7NctP0sd5c7y2F1T0NPRXcWz1WU/axZ/xtVQ39HSjdacDAUegAAAABJRU5ErkJggg==" />',
		flavorText: 'You are a villager. You live peacefully in the town, which with the mafia activity hasn\'t been all too peaceful, actually.'
	},

	mafia: {
		name: "Mafia",
		side: 'mafia',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAADm0lEQVR42u1cQW7cMAw0VZ1yTw99QIoA/VWA5E8+9NBn+Qt+Q+ucWBCGZJESSUnO+hIgu7bE0ZAcUvIuS6frOI5jmewKvYBatx1mAyz0HBwBmwW02HsC67YDsg0AYGSwoJcLpj57f3k+lmVZRgUtjjSZFpahK1sCHUZcQWnwv2LrtGBJjKrJltYZdkhmSYz3YtXwYJUA8wRqCrA83MsNrNFEpSWwsRUomu4tUzeCgM/3dkFVneWhxM+ATV8bWseXnvErWBpkZZS3+5lnw3XbwZgFr1hL3qY2NATs6TbMSrFM+bG/bgkWBU3LddZt/+PN5iawAEBsvDJgcFtmWQB2e7BmvZrBqnHFnlrpwawHWDcFq9YVZ7viHY3CheNoLUkHI84KhFbykLR84mzg9MyiamABAGh1LylAI0mM+BXZQ8eTxCz1SZXYlYo5XuxpPUsRvRnUw620DpyYTJyyyyP+4CLQv7XyoBuzuEyqYVwGmLf3l2ez3Z9gwaoWAEo66urzddt/T5ENESQtV0NQKp4XrPYWo3aMGiBRHEMyS5NNFICcq/Uu1kMrmzSAoiBxATl978ewCl7idi3ait6XAtFbt4ElUFoGcdmG43z8/N7fDXsc88kBlZoHurHVOYtobVhLN6K1wNY+MyYCCw2/+tyKSS3aS0t3iZllfZCMuwF7joWlezQAc1uhmsSgns0awQpSY89uyA2k0h0gAux/LdeaXFqDPtSwAit7/L+k0peqfhqnUjJEysAWdkGtC52DrbQ1IgGt0GkQMbYFrOpyh2NkKXOia5bKnFKb2kv7ASeYc4MzZVfKRZkx49u67f+kSaBUhGswK3KCeY2uyd3D2Mz4m1rEq40OZCYW9lbdiaihebhAUVGb+k5pPM4CWLZx3PcNzy55BiCX9Urspjs4OXc3EaUttVyuwKUT1SzIc9tcZ8A0Ko+gISClha7mESXOmFNshdUU5Tk3pMyV7Atq1rLhqq2hufopYFBr5YApAYX3X+k4swDf42dPWsbyfp0u5JhgrYqxm5mTEJxs6L2wRZ1lyaZU/MnFJTqf87y8GOYW4M8VQa7rmTtIkgOVPtsaMPcXnVKBHIHgqvdctrR2yWClf6Qg0nGvpINHWdOdWZItLU0BPK0bSsqkVIwqFdzuv0Vj4YopQ1MGc9jS8/SyG7M47R7p9taXdENuf6r3S52qXQftGEZBG+HlgeDRRtFg2QhzCV59J0258YhZE1yfuGXvt3R3qnsAAAAASUVORK5CYII=" />',
		flavorText: 'You are a member of the mafia. Every night, you get together with the other mafia members to eliminate someone in the town. The townsfolk aren\'t all that happy with that, however.'
	},

	hooker: {
		name: "Hooker",
		side: 'town',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE0UlEQVR42u2cvY4TMRDH/16tQHAdImloqBKoEQ/AW9DQJh1vg8TtC/AavAWXbaABoSwlh0QRQkH28Jnxx4zH3twRS+i43K4/fjsz/nvWDnAqp3Iqp3Iqp/K/FzNl4+ebLfue9XI+WX/bKQGtFrM9u4LN1kwFsJ0SUNcPbMsmAVsAS4IzNSDlAuIA7PrBlAJmakAqASgEzm5PE5wpAWoKSDUszZQANRWkkKVpADPabscFJZoRnRJrUwuYqe12LhwNK0xp336QUmimptuVdtEYtMPfX3T98F4CzNRwu9oBP9Qvuy9cYGYceOqNHLebclaMPUhJHDP7/T6ZtOt2VIckApQb5LXcngustQeOzdZ7IxWfun4w42dcK8pR9RRcqg5Jv5LWhlcVB4BpuVtuoKfu9fUh5AXcMTfUzZLUSWqgLzUjdv1gbEsKWZl0zI2GREgJ9OP9pYN9SWBNyY7XhJQLjEonRWHluCIVl6ZaJ8agSK5vc1yQ+3mB9eHTrh8uYgB8gZ37INsgZSKFqzHTaSyeD+XDajELxk1NYG2um3GXGblSwVePxiwbkxKNNBByXFITVEyRh2a73DE2Wm5FWFm2u+VIlRKTRhObZmNwPKAeA1DvcKVJww9rvZyzzTHQwfuHej7iCIq7/kxxxZB0asb0jASYY2F3AbzCLS6t1PQdUADwAMBbbXeS9CsUT3M86ArWejkHNttk7WGBMgDuAfiSOjCusubEo2spp7/XvwTwLvXhq+usQwOvAbwBcCnRRhJJEquLStW4ObeUGEfpLcPNMDgVPwPwfHQ/LUAlZ9HUJRqVRf3HslLdkcpCHhOgKgGe83qLsqSptVDqkkYyyahsOZLmuTUsMrb8URWlpURgKWXOuS8nn0aJ00bqglzNE1tQa7YpXbzH7mk0Y0GqBtLKSKRKCbZkqOGGoQZrxhZJ+oUVs7T3VknWmZqTSpGsQ82Vv/ZgqHVgybEUh1VyUKOr5e75Sr2+qSkUqTfSuVN76P9CYCYKa8xplVTNmgPj1McZV9cP07mhNqjQVF81ZuWkmFMCec2BpaZ8sgK8Zk6+1sK41hYB0g1vCjB7NpS+NlORDhxgN8UKY2/MY8m/YIC3gR0bEPdB+vYzaLYZzWeNmVPfEuO2Z0dZsK6AAdegjcBKxjbJxlxJJjT1elam1IZWEtjUB6V8W75FopQK/poDpJKGHI1WauOdOAdPvQXStDDfNsuUd4CrxewRgK8AfuHP5pddtZg1JTDbUlLr7frhs/XrTnIYi9rMlv12RwqMkzlVyn09BPDN+ugMwHdO+FCLM75MqzQLIN2R6MiaBsDO126KEFW1rJCFaeWrMmbRXSyYrxazJwAuUgxH9XsdbGDHIAESAY9bw/fjzucqsHyKPzMZZzSvm2w2TFX8Em2zXs6x2u/pQ6OW9YZAaWvB6m5CHfAMDNAYY4L1pM6uqYK0qHTgQEoJ3qmayI2Pyu88z7DZXrrA2lqAuAcQbJe75toKC+LEWdhUsSzqC3uy14nEERHXuqTajSh3pKd62aD2hYrvWJ/bpu/3880W7r9Acz/dNqt/2ViOOE192hx3DOW/VovZY/t0XDvVwHMSfFL3CC3HDj/Pun74YfXtE4CrPhcTpRqC1AdZAox6UEQfL6nAPvb5N1QgBGNeBijNAAAAAElFTkSuQmCC" />',
		flavorText: 'You are the hooker. Every night, you can visit someone in the town. The person you visit can\'t execute any actions that night.',

		onNight: {
			target: {side: 'all', type: 'single'},
			priority: 5,
			callback: MafiaFunctions.roleBlock
		}
	},

	doctor: {
		name: "Doctor",
		side: 'town',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAADQUlEQVR42u1b265EEQydiv//ZfMyOxGhelX28DQ5cbZ2Wb1Rn88dd9xxxx13/PuA0xUopZSuYgBwwSIA5QUavBkoa9DgZABqEFawDHbwFTNF22/25gMAeAMGXrtPEYqqXDtvBIw3YLDCRDSAYwyWAuYKlgSonmDcXecoXc/1Agw8gaKwgLN2+x3s/z3MMUVEOfgNz2jpkZQuAUuqBDbXAgyu1WRvE+QqR4l8o7+F1oZasKQASfIsaRrBkRM8WcV14B4mbwmYq88aCVp+I+SYBcn9ZjItd/ArQSqllB447d+gGph8+a1ASRmG5XL57SA97JLmaDU70+ePhqjEqYDObwWjZtLId22fwY8cqzVrrJLULczQQznML1n4zbTaB+waHV3BWlGLRTh1zNclqZ+JBI27JvdS48nm23WyJ3u4+Y0no6myYJEzWSlAiWraOTNGh7gGKzaMilOswJYW3e0czroqvS3A4gpmteYM3N664lMQS1ZZKOdtNZy1Q8udU9IP9yRxFUO560h8WbgJWnxPuo7UFHM9eVezqHOkOsFcLW+OWFTj3yI3NlNpy+mK8VQkcmMTVgZgYb1n90dHNyqzZo0bI2D+AaCuGc76CqjdKyekR+E15Oj3KbkkpZoQNYacyiyt/80Sup7oq0aRGgOwnZskYMwO0jwO/ayOiTRyJSlrKId40YBRWjM5rZZpBpTmGCUKsFmHs7QRburgR/f+HKFX+TiNa6BcamQuU7TAeURTaucgp+W7Ny9LhaN09WEVgNaE28sL6lEydtU1Au35nSUC9/xarymjF66pPgwDW2pGlE2vAyfKrF69Z92DwFGqBptixjOAiWY4DhDapHPEKk3qMYpW2BHQ7DnK7B0QJd3I0sJZe3bFKaUo5iwxQwo5SG2SVLS5jtvixMDzkHFUDgEAZK3JWAtKuc2hmpR1CpIsd33XMymrSiKk82+W31AaSCweeLLljmCV9nkuJ/hwW7ox8966W5ny5Bd7RWHtGo7sg38A0qQLR5ih9Y5rH61zSrzjHw2suHUy64OPZJVH+oLVxsuY5dmM67EBPZYe+9Apor08ncoqb1M0Byv6HeFqOY5+b+jZvNv7bnqTCV5mbTS+UJk0SHjWZPsAAAAASUVORK5CYII=" />',
		flavorText: 'You are the doctor. Every night, you can visit someone in the town. This person can\'t die that night.',

		onNight: {
			target: {side: 'all', type: 'single'},
			priority: 4,
			callback: MafiaFunctions.protected
		}
	},

	cop: {
		name: "Cop",
		side: 'town',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAESElEQVR42u1csZLbIBBlGaVJbxcpU/j+zP4m68+kJmVmpDrVFUoTbggHy8LuAvIcM57z2UiCx9vl7QI25qt8FY0CIzTiuWzo94+36xBgTSMAdL9dDrTyssEIgMGwAAVlXncYiWXqQB0C5blsWbM9JbNqmeRYhF07r3tz05w0gSo1tZJyv12O1r7MjgZUyKrUZz2KNYOVGMhU4GM+7iWkA5VV/uchaM4EHSix64/jOAAAXgasFBhYvXndAQNpSAcfozoAgFk2KOk88t13Y8wfv54PTkt/BlygYo31OxUC4dfHQKL4MwpQ99tF1wyfy5ZVyimgYuZCcdiUjnv3/WmM+dVdlLppPyf6MLBSwEibzP12McYY1G9JMstinfQVeG2IMa87uJe0SJ3X3YH0Q1MAV+ksbkym5Yzndf/tBsMHTZJV2dnQhRSh/3kumwEAoJpiDwmi0S5L9A2HOVHRGsApZ14hUB9x3z/GjRouOT8pqeCt/xD3wmYWHzwAgJFY57ddo11Qmylwo1Xrt2q1VilYzvFLsIsd7tQ4eqpY5YCnIVWsY0crc6IAVaPL3H01+2Gfy8amP9d3pVQ+FzD33s9QsMzwI6Tx9JTW1BxjVQqoWIcpMyD1GtZs+Hi7msfbtRoIyZkx1fnes+0waeUWkQDXFD+BxWGXhHwoqR+LBVOD4IvUbtKBOwty5AB2v5jecn9rVX3UDGvYpRFUu47WyoIU62oZZmtGN0wKUoDKfY/NiimgUuClwjbuJAG5/FVMVftg1WRMY2aCAUqVMymfhT27xBwnxKy+zev+ruXEYys1IRsk5IKksreIbnoPGx8+VMJPhczysx+jzMJFsyFHsWs2PgRZPTbkCLwRUso+QFrpZHUF3yI8iTEp5zpUwcop5F7hSy5YpkiVUmE6jcISLqNKZ8EaBQ81gWdJSrm1OVKcfW2Keaj9WRJxJwYUNw+fZVZs1PyHjsKuXK5N4j5sneUWLLB63OUpTozXbPm+tEG+j8M20lI7m6pPCYkkQSpy8GGjKQ2R2MIYix9jIVKr7d1q0iHFNg3/Rdl8N7SC90FzRcJfpT5rcUTltNKhR1zaDCw38tLZy/+uVz6eMlFGENt9zA2utdM/zZmlSfmalHFsH3wL8KZWJiiR4CMBr2iKwx10ooKUWhc8tXRoFUj7gGnJiJcAy2eZA04DMPsKIMUcfHjo4RQOXvpUa6pOchVb0OFXLd9LnxCVlB6x/7EixqwRT1Hk2FdyFrGU8afzWT2zrqo+C/NXudBJM1Vduzfeno1V3PiUc4jA1j4w5xw5rBq1ZMEa5XxOb1a9jIIfhlkpdmGmiCnn2r2hvVmlyizRDKhyBqObdJD+dSNJVhljzIPxWxYTd6QkT4piKrxlRrRbIF0jRHN1SveJSQFMBosSJ5aaIPUX2CSVe1dmlZpiKgdF3QNfwhRp8VsEFsauXKKt5NyNNCPcPbh5rb8ffuSuq78W3AAAAABJRU5ErkJggg==" />',
		flavorText: 'You are the cop. Every night, you can visit someone in town. When the night is over, you\'ll receive a report with that person\'s alignment.',

		onNight: {
			target: {side: 'all', type: 'single'},
			priority: -1,
			callback: MafiaFunctions.copReport
		}
	},

	werewolf: {
		name: "Werewolf",
		side: 'solo',
		image: '<img width="75" height="75" title="" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEi0lEQVR42u1bS04cMRB1OQ1I2bAaSDZRpESwiJSb5BpklWVOwZIVcwxYJJfgAI1mnVFmYKRopEh8EmdDI4/xp8pVdjdKl4SERm53+fWrqudyt1KjjTbaaKONNtpoo4022mij/e8GQ3fQGGMenQWAESwCYBvOVwbvWYNVGzR4LvkiBVgN4CDXqT5CoW/fQMKpWgBy/JLwCUo4luts6p7Ty+XGHEcHk6pMqwaWz3H3Hi4YKVCo47mAQSnaYyy02JRRwPONzQVMU2mbu0BpkEPAuOBI+ouayGZYDvWlmZXDMndcDrvQF2AAywWOC1oOYEXBogJGAa4kw9z5OYDpvvILN4QpgGPnT26rOMKQyojU05dgIYZh3RibWcYY0/kQYpzmUp/CCgzLpO/pA9L2wTwYxi8Ws7g5yFfmJaoqJX/5rg0xK+spU8WqRD6h3CM1Z8ofUbC4Cp+7x8PMnQuYL5911khujrHgSYLjm5ubF6eXSzDGPGFYg2ENVo90m2OMs6UBKzFvg6GqyxiJ3lBOHisZvhi/kl2H1E7eF4qcMKC2YzigxfKWWM5ydUrfXYlcySGWs7A5SBIc6oJtkSkNWC97w9KqnPPgQvcM/Z4MQ0qFG1LlkgDdDUUdSuy2lcxDkq2e0tb0wSapBF7bPx0Lv9JPE5OrOkBqJPCUfGjUMzIbsJICNaSzUAefJejOafSVrJyxjTTpdEcaNG4rpQabbdAaygXSLMO2U0oClVqPLR+yOqW1NBf2hLmGbAEA0BSQ+tZcfWstnRO7NdRzDaDIb+FgEnttEWgvwqevSoQnpjr2Jh1yn3jJLmzquL9X6UBdsG8xtcIWneDhwYbYIQhtm0o8WI1lVulwpApUai9KQphqDFCxY/fPh3uPf7WqUyhEu99D+0eugoeYag2xCQPMabuoltjt3OVWUs5DcXM6BiybfYbCICpglFC02XN0MHn0LwSaW9lSvvnWCYjqB9YE5HyAAYz6Jg7mWhs0t7XjA+K0XajUGI1V6+cnx1nxL5HLqPtHu0Lm5K2Qz6iuw8W3Mz2ftYOSCtSNMGH8FntvqJRSbz583JJmF6fUu+eGsdDtQvHoYGLc1GCFoAaAezJYrghdr67g7uZmcF+R2YI09m68vRYfYNPLJQCAQYvS1BHY/d2tOFhSQjcGmI95HWCn7WJDJ8YKUuNL7A5Q5sesNUrg28SQmIyd3FDe6HPkxMb/0U5Fu0CtDZPgQSml9t++g/Xq2uxO9l/+Wv78ncsid8FYAFw5gGUsZqwtL2JM14h8ZZRSanfvldna2THN9vbfvsLOlgMpRU/VbpjxgOljnZ8c6/mshfXqCtaraz2ftbccYSp5lMXtfbEVvCdvwfnJMcxnLVx8P/vDUfElzvxclZ7DGoww16FK6A789OWref3+kL3dkfhwgLrJpoKEfrU70rcC6v4wVIZL9cu5IOU2/3wXGkonIZSnagEFjsVYhG2vN74JIux6ApidCLvf+349yPdOaJGv760elkh7VrrNi81PJc45AVEJBwESNQRLMBYCTb8XD8waFLuo7yZIg/UPoRFdOwTxQDIAAAAASUVORK5CYII=" />',
		flavorText: 'You are the werewolf. You\'re not aligned with either town or mafia, and instead kill someone every night. You win if you\'re the only remaining player.',
		victoryText: 'The wolf howls victorious, knowing he came out of this mess alive, and with some lunch as well.',

		onNight: {
			target: {side: 'all', type: 'single'},
			priority: 2,
			callback: MafiaFunctions.killTarget
		}
	}
};
