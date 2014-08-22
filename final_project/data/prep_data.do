clear all
set more off
capture restore, not

cd C:\wamp\vhosts\gh_viz\final_project\data

insheet using ./measles_data.csv, comma names clear

rename number cases
rename state abbrev

split to_date, parse("/")
rename to_date3 year
destring year, replace
drop to_date1 to_date2

drop if abbrev == "PR" | abbrev == "PI" | abbrev == "GU" | abbrev == "VI" | abbrev == "PT"

replace loc = "NEW YORK" if loc == "UPSTATE NEW YORK" | loc == "NEW YORK CITY"

preserve

collapse (sum) cases, by(year abbrev loc)

keep if year >= 1946 & year <= 1980

egen group = group(abbrev)
tsset group year

gen cases_avg = round((L2.cases + L.cases + cases + F.cases + F2.cases) / 5)

drop group

order loc abbrev year cases cases_avg
sort loc year

drop if year < 1948 | year > 1978
drop if cases_avg == .

outsheet using "./data_formatted.csv", comma names replace

restore

preserve

collapse (sum) cases, by(year)

keep if year >= 1946 & year <= 1980

gen group = 1
tsset group year

gen cases_avg = round((L2.cases + L.cases + cases + F.cases + F2.cases) / 5)

drop group

gen loc = "NATIONAL"
order loc year cases cases_avg
sort year

drop if year < 1948 | year > 1978
drop if cases_avg == .

outsheet using "./national_data_formatted.csv", comma names replace

restore