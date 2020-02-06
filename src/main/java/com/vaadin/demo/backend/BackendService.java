package com.vaadin.demo.backend;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BackendService {

    private List<Employee> employees;

    {
    // Init dummy data

        employees = new ArrayList<>();
        employees.add(new Employee("Rowena", "Leeming", "rleeming0@bbc.co.uk", "Food Chemist"));
        employees.add(new Employee("Alvinia", "Delong", "adelong1@altervista.org", "Recruiting Manager"));
        employees.add(new Employee("Leodora", "Burry", "lburry2@example.com", "Food Chemist"));
        employees.add(new Employee("Karen", "Oaten", "koaten3@ihg.com", "VP Sales"));
        employees.add(new Employee("Mariele", "Huke", "mhuke4@washingtonpost.com", "Research Assistant IV"));
        employees.add(new Employee("Grata", "Widdowes", "gwiddowes5@cargocollective.com", "Actuary"));
        employees.add(new Employee("Donna", "Roadknight", "droadknight6@apache.org", "Mechanical Systems Engineer"));
        employees.add(new Employee("Tommi", "Nowland", "tnowland7@biblegateway.com", "Senior Developer"));
        employees.add(new Employee("Tonya", "Teresia", "tteresia8@boston.com", "Assistant Manager"));
        employees.add(new Employee("Steffen", "Yon", "syon9@ocn.ne.jp", "Senior Sales Associate"));
        employees.add(new Employee("Consalve", "Willes", "cwillesa@linkedin.com", "Programmer I"));
        employees.add(new Employee("Jeanelle", "Lambertz", "jlambertzb@nymag.com", "Operator"));
        employees.add(new Employee("Odelia", "Loker", "olokerc@gov.uk", "Developer I"));
        employees.add(new Employee("Briano", "Shawell", "bshawelld@posterous.com", "Research Assistant IV"));
        employees.add(new Employee("Tarrance", "Mainston", "tmainstone@cmu.edu", "Research Nurse"));
        employees.add(new Employee("Torrence", "Gehring", "tgehringf@a8.net", "Geological Engineer"));
        employees.add(new Employee("Augie", "Pionter", "apionterg@ehow.com", "Senior Financial Analyst"));
        employees.add(new Employee("Marillin", "Aveson", "mavesonh@shop-pro.jp", "Technical Writer"));
        employees.add(new Employee("Jacquelyn", "Moreby", "jmorebyi@slashdot.org", "Executive Secretary"));
        employees.add(new Employee("Glenn", "Bangley", "gbangleyj@prlog.org", "Account Executive"));
        employees.add(new Employee("Isidoro", "Glave", "iglavek@tamu.edu", "Compensation Analyst"));
        employees.add(new Employee("Cchaddie", "Spatarul", "cspatarull@sun.com", "Business Systems Development Analyst"));
    }

    public List<Employee> getEmployees() {
        return employees;
    }

}
