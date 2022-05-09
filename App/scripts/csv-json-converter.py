import csv
import json

if __name__ == "__main__":
    output_dict = {"data": []}
    with open("data\dataset.csv", "r") as csv_file:
        csv_input = csv.DictReader(csv_file)
        for row in csv_input:
            output_dict["data"].append(
                {"name": row["EmployerName"], "details": [row["EmployerSize"], row["DiffMeanHourlyPercent"]]})
    print(output_dict)

    with open('json_data.json', 'w') as outfile:
        json.dump(json.dumps(output_dict), outfile)
